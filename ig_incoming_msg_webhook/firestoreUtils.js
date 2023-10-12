async function writeData(data, docId, admin) {
    const db = admin.firestore();
    const collectionRef = db.collection('ig_msgs');
    const documentRef = collectionRef.doc(docId);
    await documentRef.set(data);
  }
  
  async function writeDataToFirestore(data, checksum, admin) {
    try {
      const docExists = await isDocumentExists(checksum, admin);
      if (docExists) {
        throw new Error('Duplicate entry.'); // Throw an error for duplicate entry
      } else {
        await writeData(data, checksum, admin); // Await the writeData function
      }
    } catch (error) {
      console.error('Error writing data:', error.message);
      throw error;
    }
  }
  
  async function isDocumentExists(documentId, admin) {
    try {
      const db = admin.firestore();
      const documentRef = db.collection('ig').doc(documentId);
      const snapshot = await documentRef.get();
      return snapshot.exists;
    } catch (error) {
      console.error('Error checking document existence:', error);
      throw error;
    }
  }
  
  module.exports = { writeDataToFirestore };