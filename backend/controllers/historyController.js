const pool = require('../config/db');

async function getHistory(req, res) {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.query('USE intellisql_admin');
        const [rows] = await connection.query('SELECT * FROM query_history ORDER BY created_at DESC LIMIT 100');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history', details: error.message });
    } finally {
        if (connection) connection.release();
    }
}

async function getAnalytics(req, res) {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.query('USE intellisql_admin');
        
        const [totalQueries] = await connection.query('SELECT COUNT(*) as count FROM query_history');
        const [successQueries] = await connection.query('SELECT COUNT(*) as count FROM query_history WHERE status = "SUCCESS"');
        const [failedQueries] = await connection.query('SELECT COUNT(*) as count FROM query_history WHERE status != "SUCCESS"');
        const [avgTime] = await connection.query('SELECT AVG(execution_time) as avg FROM query_history WHERE status = "SUCCESS"');
        
        res.json({
            total: totalQueries[0].count,
            success: successQueries[0].count,
            failed: failedQueries[0].count,
            avgExecutionTime: avgTime[0].avg ? Math.round(avgTime[0].avg) : 0
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch analytics', details: error.message });
    } finally {
        if (connection) connection.release();
    }
}

module.exports = {
    getHistory,
    getAnalytics
};
