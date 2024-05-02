const express = require('express');
const router = express.Router();
const airwallexController = require('../controllers/airwallexController');

// Route to fetch data from Airwallex and send it to Airtable
router.get('/sync-with-airtable', airwallexController.syncDataWithAirtable);

module.exports = router;
