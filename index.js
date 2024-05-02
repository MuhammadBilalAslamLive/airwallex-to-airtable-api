const express = require('express');
const airwallexRoutes = require('./routes/airwallexRoutes'); 
const dotenv = require('dotenv');
dotenv.config();               

const app = express();
const port = process.env.PORT || 5000; // Default port 5000

app.use('/api/airwallex', airwallexRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
