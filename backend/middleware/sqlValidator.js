const { Parser } = require('node-sql-parser');
const parser = new Parser();

function validateSQL(req, res, next) {
    const { sql } = req.body;

    if (!sql) {
        // Only skip validation if SQL is not present (might be an initial generation step)
        return next();
    }

    try {
        // This parses the AST. Throws an error on syntax issues
        const astList = parser.astify(sql);
        
        const asts = Array.isArray(astList) ? astList : [astList];

        if (asts.length > 1) {
            return res.status(400).json({ error: 'Validation failed: Multiple statements detected.' });
        }

        const ast = asts[0];

        if (ast.type !== 'select') {
            return res.status(400).json({ error: `Validation failed: Only SELECT statements are allowed. Detected: ${ast.type}` });
        }

        // Passed validation
        next();
    } catch (error) {
        console.error('SQL Validation Error:', error);
        return res.status(400).json({ error: 'Validation failed: Invalid SQL syntax.' });
    }
}

module.exports = validateSQL;
