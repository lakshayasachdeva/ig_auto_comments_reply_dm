const crypto = require('crypto');
const { writeDataToFirestore } = require('./firestoreUtils');

function handleRequest(admin) {
    return async (req, res) => {
      try {
        // Check if the Firebase app is initialized
        if (!admin.apps.length) {
          console.error('Firebase app is not initialized');
          res.status(500).send('Firebase app is not initialized');
          return;
        }
        let requestBody = req.body;
        if (requestBody.entry[0].changes[0].value.from.username == 'ciaobellajewels.in') {
          res.status(200).send('Sending 200 without saving as it is self reply.');
        } else{
          const checksum = generateChecksum(JSON.stringify(requestBody));
          const dataToWrite = {
            json: JSON.stringify(requestBody),
            msgTimestamp: requestBody.entry[0].time,
            syncStatus: false
          };
          try {
            await writeDataToFirestore(dataToWrite, checksum, admin);
            console.log('Document successfully written!');
            res.status(200).send('Document successfully written!');
        } catch (writeError) {
            console.error('Error writing document:', writeError);
            res.status(500).send('Error writing document');
        }
      }
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(400).json({ message: 'Invalid JSON data', error: parseError });
      }
    };
}

function generateChecksum(jsonStr) {
  const hash = crypto.createHash('sha256').update(jsonStr).digest('hex');
  return hash;
}

module.exports = { handleRequest };