const pool = require('../config/db');

async function getDatabaseSchema(databaseName) {
    let connection;
    try {
        connection = await pool.getConnection();
        await connection.query(`USE \`${databaseName}\``);

        const [tables] = await connection.query('SHOW TABLES');
        let schemaString = '';

        for (const tableObj of tables) {
            const tableName = Object.values(tableObj)[0];
            const [columns] = await connection.query(`DESCRIBE \`${tableName}\``);
            
            const columnNames = columns.map(col => col.Field);
            schemaString += `${tableName}(\n${columnNames.join(',\n')}\n)\n\n`;
        }

        return schemaString.trim();
    } catch (error) {
        console.error('Error fetching schema:', error);
        throw error;
    } finally {
        if (connection) connection.release();
    }
}

module.exports = {
    getDatabaseSchema
};
