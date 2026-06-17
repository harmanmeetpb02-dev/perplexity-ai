import './config/env.js';
import dns from 'dns';
import app from './src/app.js';
import connectDB from './config/db.js';

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Connect to MongoDB Database
connectDB();

// Define Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running in development mode on port ${PORT}`);
});
