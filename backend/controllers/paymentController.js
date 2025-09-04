const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/Payment");
const User = require("../models/User");
const Plan = require("../models/Plan");
const sendEmail = require("../utils/sendEmail");
const { subscriptionActivatedEmail } = require("../utils/emailTemplates");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1️⃣ Create Plan
exports.createPlan = async (req, res) => {
  try {
    const { planName, amount, interval, interval_unit } = req.body;

    // 1. Create plan in Razorpay
    const razorpayPlan = await razorpay.plans.create({
      period: interval_unit,
      interval: interval,
      item: {
        name: planName,
        amount: amount,
        currency: "INR",
      },
    });

    // 2. Save plan in MongoDB
    const savedPlan = await Plan.create({
      razorpayPlanId: razorpayPlan.id,
      name: razorpayPlan.item.name,
      amount: razorpayPlan.item.amount,
      currency: razorpayPlan.item.currency,
      period: razorpayPlan.period,
      interval: razorpayPlan.interval,
    });

    res.json({
      message: "Plan created successfully",
      razorpayPlan,
      savedPlan
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error creating plan" });
  }
};

// 2️⃣ Create Subscription
exports.createSubscription = async (req, res) => {
  try {
    const { plan_id } = req.body;
    if (!plan_id) return res.status(400).json({ msg: "plan_id is required" });

    const userId = req.user?.id || req.user?._id || null;

 

    // ✅ Only allowed fields
    const subscription = await razorpay.subscriptions.create({
      plan_id,
      customer_notify: 1,
      total_count: 1,
      notes: { userId },
    });

    // 👇 upsert instead of create to avoid duplicates on retries
    await Payment.findOneAndUpdate(
      { razorpaySubscriptionId: subscription.id },
      {
        ...(userId ? { user: userId } : {}),
        razorpaySubscriptionId: subscription.id,
        status: "created",
      },
      { new: true, upsert: true }
    );

    // Also return the exact public key the server used (avoids mode/key mismatch)
    return res.json({
      id: subscription.id,
      status: subscription.status,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("createSubscription error:", err?.error || err);
    return res.status(500).json({
      msg: "Error creating subscription",
      code: err?.error?.code || "SUBSCRIPTION_CREATE_ERROR",
      detail: err?.error?.description || err?.message || "unknown",
    });
  }
};



// 3️⃣ Verify first payment for subscription
exports.verifySubscriptionPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body;

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_payment_id}|${razorpay_subscription_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ msg: "Invalid signature" });
    }

    const payment = await Payment.findOne({ razorpaySubscriptionId: razorpay_subscription_id }).populate("user");
    if (!payment) return res.status(404).json({ msg: "Subscription not found" });

    payment.razorpayPaymentId = razorpay_payment_id;
    payment.razorpaySignature = razorpay_signature;
    payment.status = "active";
    await payment.save();

    const user = await User.findById(payment.user._id);
    user.isSubscribed = true;
    user.subscriptionAt = new Date();
    await user.save();

    const { subject, html, text } = subscriptionActivatedEmail({
      email: user.email,
      planName: 'Premium Monthly',
    });
    sendEmail({ to: user.email, subject, html, text })
      .catch(e => console.error('sendEmail error:', e?.message || e));

    res.json({ msg: "Subscription payment verified", payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// 4️⃣ Webhook for future renewals
exports.handleWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const shasum = crypto.createHmac("sha256", secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (digest !== req.headers["x-razorpay-signature"]) {
      return res.status(400).json({ msg: "Invalid webhook signature" });
    }

    const event = req.body.event;

    if (event === "invoice.paid") {
      const subscriptionId = req.body.payload.subscription.entity.id;
      const payment = await Payment.findOne({ razorpaySubscriptionId: subscriptionId }).populate("user");

      if (payment) {
        payment.status = "active";
        await payment.save();
        console.log(`Subscription ${subscriptionId} renewed successfully.`);
      }
    }

    res.json({ status: "ok" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Webhook error" });
  }
};
