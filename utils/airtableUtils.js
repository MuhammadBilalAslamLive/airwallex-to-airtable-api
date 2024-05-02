const dotenv = require('dotenv');
dotenv.config();
const airtableApiKey = process.env.AIRTABLE_API_KEY;
const airtableBaseId = process.env.AIRTABLE_BASE_ID;
const airtableTableName = process.env.AIRTABLE_TABLE_NAME;

module.exports = {
    airtableApiKey,
    airtableBaseId,
    airtableTableName
  };