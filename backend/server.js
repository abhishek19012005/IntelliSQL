require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const queryRoutes = require('./routes/queryRoutes');
const historyRoutes = require('./routes/historyRoutes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', queryRoutes);
app.use('/api', historyRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
