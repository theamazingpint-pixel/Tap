const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/roleMiddleware');
const admin = require('../controllers/adminController');

router.use(auth, requireAdmin);

router.get('/overview', admin.getOverview);
router.get('/users', admin.getUsers);
router.get('/payments', admin.getPayments);
router.post('/users/:id/subscription', admin.toggleUserSubscription);

module.exports = router;
