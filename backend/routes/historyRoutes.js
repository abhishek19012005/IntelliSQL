const express = require('express');
const router = express.Router();
const { getHistory, getAnalytics } = require('../controllers/historyController');

router.get('/history', getHistory);
router.get('/analytics', getAnalytics);

module.exports = router;
