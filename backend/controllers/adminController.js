const User = require('../models/User');
const Payment = require('../models/Payment');


exports.getOverview = async (req, res) => {
  try {
    const range = req.query.range || "monthly";
    const now = new Date();

    let currentStart, previousStart, previousEnd;

    if (range === "weekly") {
      currentStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
      previousStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14);
      previousEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 8);
    } else if (range === "annually") {
      currentStart = new Date(now.getFullYear() - 1, now.getMonth() + 1, 1);
      previousStart = new Date(now.getFullYear() - 2, now.getMonth() + 1, 1);
      previousEnd = new Date(now.getFullYear() - 1, now.getMonth(), 31);
    } else {
      // default to monthly
      currentStart = new Date(now.getFullYear(), now.getMonth(), 1);
      previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      previousEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    }

    // Current metrics
    const [totalUsers, activeSubscribers, currentNewUsers, currentRevenueAgg] = await Promise.all([
      User.countDocuments({}),
      User.countDocuments({ isSubscribed: true }),
      User.countDocuments({ createdAt: { $gte: currentStart } }),
      Payment.aggregate([
        { $match: { status: "active", createdAt: { $gte: currentStart } } },
        { $group: { _id: null, amount: { $sum: "$amount" } } },
      ]),
    ]);

    // Previous metrics
    const [previousNewUsers, previousRevenueAgg] = await Promise.all([
      User.countDocuments({
        createdAt: { $gte: previousStart, $lte: previousEnd },
      }),
      Payment.aggregate([
        {
          $match: {
            status: "active",
            createdAt: { $gte: previousStart, $lte: previousEnd },
          },
        },
        { $group: { _id: null, amount: { $sum: "$amount" } } },
      ]),
    ]);

    const calcChange = (curr, prev) => {
      if (prev === 0 && curr > 0) return 100;
      if (prev === 0) return 0;
      return ((curr - prev) / prev) * 100;
    };

    const currentRevenue = (currentRevenueAgg[0]?.amount || 0) / 100;
    const previousRevenue = (previousRevenueAgg[0]?.amount || 0) / 100;

    res.json({
      totalUsers,
      activeSubscribers,
      revenue: currentRevenue,
      changes: {
        newUsers: {
          value: currentNewUsers,
          change: calcChange(currentNewUsers, previousNewUsers),
        },
        revenue: {
          value: currentRevenue,
          change: calcChange(currentRevenue, previousRevenue),
        },
      },
    });
  } catch (err) {
    console.error("getOverview error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};



exports.getUsers = async (req, res) => {
  const { q = '', page = 1, limit = 20, subscribed } = req.query;

  const where = {};
  if (q) {
    where.$or = [
      { email: new RegExp(q, 'i') },
      { name: new RegExp(q, 'i') },
      { phone: new RegExp(q, 'i') }
    ];
  }
  if (subscribed === 'true') where.isSubscribed = true;
  if (subscribed === 'false') where.isSubscribed = false;

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    User.find(where).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
    User.countDocuments(where)
  ]);

  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
};


exports.getPayments = async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;
  const where = status ? { status } : {};

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Payment.find(where).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).lean(),
    Payment.countDocuments(where)
  ]);

  res.json({ items, total, page: Number(page), pages: Math.ceil(total / limit) });
};


exports.toggleUserSubscription = async (req, res) => {
  const { isSubscribed, subscriptionPlan, subscriptionEnd } = req.body;

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      isSubscribed,
      subscriptionPlan: subscriptionPlan ?? undefined,
      subscriptionAt: isSubscribed ? new Date() : undefined,
      subscriptionEnd: subscriptionEnd ? new Date(subscriptionEnd) : undefined,
    },
    { new: true }
  ).lean();

  if (!user) return res.status(404).json({ msg: 'User not found' });
  res.json(user);
};
