const { sendReplyToComment, sendDMToUser } = require('./metaApiHandler');
const { fetchRecordsFromFirestore, batchUpdateRecordsInFirestore } = require('./firestoreUtils');

async function processRecord(record) {
  try {
    let json = JSON.parse(record.json);
    try {
      await sendReplyToComment(json);
    }
    catch (error) {
      console.error('Error sending reply to comment', json);
      throw error;
    }
    try {
      await sendDMToUser(json);
    } catch (error) {
      console.error('Error while sending DM to user', error)
      throw error;
    }
  } catch (error) {
    console.error('Error processing record:', error);
    throw error;
  }
}

function handleRequest(admin) {
  return async (req, res) => {
  try {
    const { records } = await fetchRecordsFromFirestore(admin); 
    // Process records one by one
    for (const record of records) {
      try {
        await processRecord(record.data);
      } catch (error) {
        console.error('Error processing record:', error);
        return res.status(500).send('An error occurred while processing records.');
      }
    }
    // Batch update syncStatus and syncDate for fetched records
    try {
        await batchUpdateRecordsInFirestore(admin, records);
      } catch (error) {
        console.error('Error updating records in Firestore:', error);
        return res.status(500).send('An error occurred while updating records in Firestore');
      }
    res.status(200).send('Data successfully processed');
  } catch (error) {
    console.error('Error:', error);
    // Assume 'res' is defined elsewhere in your server setup
    res.status(500).send('Some unexpected error occurred.');
  }
  };
}

module.exports = { handleRequest };
