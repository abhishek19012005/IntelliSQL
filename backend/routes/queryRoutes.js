const express = require('express');
const router = express.Router();
const { handleGenerateSql, handleExecuteQuery, handleGetDatabases } = require('../controllers/queryController');
const validateSQL = require('../middleware/sqlValidator');

router.get('/databases', handleGetDatabases);
router.post('/generate-sql', handleGenerateSql);
router.post('/execute-query', validateSQL, handleExecuteQuery);

module.exports = router;
