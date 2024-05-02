const dotenv = require('dotenv');
dotenv.config();

const airwallexApiKey = process.env.AIRWALLEX_API_KEY;
const airwallexBaseUrl = process.env.AIRWALLEX_BASE_URL;

module.exports = {
    airwallexApiKey,
    airwallexBaseUrl
  };