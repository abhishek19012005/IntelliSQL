const { GoogleGenAI } = require('@google/genai');

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generateSQL(question, schemaContext) {
    const prompt = `You are an expert SQL developer.

Database Schema:
${schemaContext}

Rules:
1. Generate SQL only.
2. Use existing tables only.
3. Use existing columns only.
4. Generate SELECT statements only.
5. Do not explain anything.
6. Do not use markdown (no \`\`\`sql blocks, just the raw SQL text).
7. Do not generate destructive operations.

User Question:
${question}`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        let sql = response.text.trim();
        
        // Sometimes Gemini still includes markdown despite the prompt.
        if (sql.startsWith('\`\`\`sql')) {
            sql = sql.replace(/^\`\`\`sql\n/, '').replace(/\n\`\`\`$/, '');
        } else if (sql.startsWith('\`\`\`')) {
            sql = sql.replace(/^\`\`\`\n/, '').replace(/\n\`\`\`$/, '');
        }
        
        return sql;
    } catch (error) {
        console.error('Error generating SQL from Gemini:', error);
        throw error;
    }
}

module.exports = {
    generateSQL
};
