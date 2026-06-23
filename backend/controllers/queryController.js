const { getDatabaseSchema } = require('../services/schemaService');
const { generateSQL } = require('../services/geminiService');
const pool = require('../config/db');

async function handleGenerateSql(req, res) {
    const { question, database } = req.body;

    if (!question || !database) {
        return res.status(400).json({ error: 'Question and database are required.' });
    }

    try {
        const schema = await getDatabaseSchema(database);
        const sql = await generateSQL(question, schema);
        res.json({ sql });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate SQL', details: error.message });
    }
}

async function handleExecuteQuery(req, res) {
    const { sql, database, question } = req.body;
    let connection;

    const startTime = Date.now();
    let status = 'SUCCESS';
    let errorMessage = null;

    try {
        if (!sql || !database) {
            return res.status(400).json({ error: 'SQL and database are required.' });
        }

        connection = await pool.getConnection();
        await connection.query(`USE \`${database}\``);

        const [rows] = await connection.query(sql);
        
        res.json({ rows });
    } catch (error) {
        status = 'FAILED';
        errorMessage = error.message;
        res.status(500).json({ error: 'Failed to execute query', details: error.message });
    } finally {
        if (connection) connection.release();
        
        const executionTime = Date.now() - startTime;
        
        // Log to history asynchronously
        if (question && sql && database) {
            logHistory(database, question, sql, executionTime, status, errorMessage).catch(e => console.error("Failed to log history:", e));
        }
    }
}

async function logHistory(database, question, sql, executionTime, status, errorMessage) {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.query('USE intellisql_admin');
        const insertQuery = `
            INSERT INTO query_history (database_name, question, generated_sql, execution_time, status, error_message)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await connection.query(insertQuery, [database, question, sql, executionTime, status, errorMessage]);
    } catch (err) {
        console.error('Error logging query history:', err);
    } finally {
        if (connection) connection.release();
    }
}

async function handleGetDatabases(req, res) {
    let connection;
    try {
        connection = await pool.getConnection();
        const [rows] = await connection.query('SHOW DATABASES');
        const excludedDbs = ['information_schema', 'mysql', 'performance_schema', 'sys', 'intellisql_admin'];
        const databases = rows
            .map(row => Object.values(row)[0])
            .filter(db => !excludedDbs.includes(db));
        
        res.json(databases);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch databases', details: error.message });
    } finally {
        if (connection) connection.release();
    }
}

module.exports = {
    handleGenerateSql,
    handleExecuteQuery,
    handleGetDatabases
};
