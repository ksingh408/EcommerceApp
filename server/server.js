
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const adminRoutes=require("./routes/adminRoutes")
const cartRoutes = require('./routes/cartRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');

dotenv.config();
connectDB();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cookieParser()); // ✅ Required to read cookies

// ✅ CORS setup
app.use(cors({
  origin:'*',

  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());


// ✅ Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/admin',adminRoutes);


app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
