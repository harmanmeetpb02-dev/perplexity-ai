import dotenv from 'dotenv';
import app from './src/app.js';
import connectDB from './config/db.js';

// Configure environment variables
dotenv.config();

// Connect to MongoDB Database
connectDB();

// Define Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running in development mode on port ${PORT}`);
});
