const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
// app.use(cookieParser)



app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/seller', sellerRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

