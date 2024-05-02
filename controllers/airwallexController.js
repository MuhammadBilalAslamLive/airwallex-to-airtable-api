const axios = require('axios');
const { airwallexApiKey, airwallexBaseUrl } = require('../utils/airwallexUtils');
const { airtableApiKey, airtableBaseId, airtableTableName } = require('../utils/airtableUtils');



const airtableBaseUrl = `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableName}`;

// Fetch data from Airwallex
const fetchAirwallexData = async () => {
  try {
    const response = await axios.get(airwallexBaseUrl, {
      headers: {
        'Authorization': `Bearer ${airwallexApiKey}`,
      },
    });

    if (response.status === 200) {
      return response.data; // Return the fetched data
    } else {
      throw new Error(`Error fetching data from Airwallex: ${response.status}`);
    }
  } catch (error) {
    console.error(`Airwallex fetch error: ${error.message}`);
    throw error;
  }
};

// Send data to Airtable
const sendToAirtable = async (data) => {
  try {
    const response = await axios.post(airtableBaseUrl, {
      fields: data,
    }, {
      headers: {
        'Authorization': `Bearer ${airtableApiKey}`,
      },
    });

    if (response.status === 201) {
      console.log('Data successfully sent to Airtable');
    } else {
      console.error(`Error sending data to Airtable: ${response.status}`);
    }
  } catch (error) {
    console.error(`Airtable post error: ${error.message}`);
    throw error;
  }
};

// Controller action to sync data
const syncDataWithAirtable = async (req, res) => {
  try {
    const airwallexData = await fetchAirwallexData(); // Fetch data from Airwallex
    console.log("Data is: ",airwallexData)
    if (airwallexData) {
      // Send data to Airtable (adjust according to your data structure)
      for (const record of airwallexData.records) {
        const dataToSend = {
          'TransactionID': record.id,
          'Amount': record.amount,
          'Currency': record.currency,
          'Status': record.status,
        };
        await sendToAirtable(dataToSend); // Send each record to Airtable
      }
    }
    res.status(200).json({ message: 'Data sync completed successfully' });
  } catch (error) {
    console.error(`Error syncing data: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    syncDataWithAirtable,
};
