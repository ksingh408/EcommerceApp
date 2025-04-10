const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/userRoutes');

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

