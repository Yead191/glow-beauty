const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(` GlowBeauty Backend API Server running on port ${PORT}`);
  console.log(` Server URL: http://localhost:${PORT}`);
  console.log(`=================================================`);
});
