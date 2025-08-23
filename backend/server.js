require('dotenv').config();
const express = require('express');
const cors = require('cors');
const empRoutes = require('./routes/todoroute');
const connectDb = require('./config/db');
const app = express();
const PORT = 8000;

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'DELETE','PUT']
}));
app.use(express.json());
connectDb();
app.use('/api/employees', empRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

