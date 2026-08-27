const express = require('express');
const cors = require('cors');
const db = require('./database/db');
const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
const withdrawRoutes = require('./routes/withdrawRoutes');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', accountRoutes);
app.use('/api', withdrawRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});