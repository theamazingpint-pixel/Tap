const router = require("express").Router();
const ctrl = require("../controllers/paymentController");
const auth = require("../middleware/authMiddleware");

router.post("/create-plan", auth, ctrl.createPlan);
router.post("/create-subscription", auth, ctrl.createSubscription);
router.post("/verify-subscription", auth, ctrl.verifySubscriptionPayment);
router.post("/webhook", ctrl.handleWebhook);

module.exports = router;

