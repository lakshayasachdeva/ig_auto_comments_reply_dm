async function fetchRecordsFromFirestore(admin) {
    const db = admin.firestore();
    const collectionRef = db.collection('ig_msgs');
  
    try {
      let query = collectionRef
        .where('syncStatus', '==', false)
        .orderBy('msgTimestamp')
        .limit(10);
  
      const snapshot = await query.get();
      const records = snapshot.docs.map(doc => ({
        id: doc.id, // Include the document ID in the record
        data: doc.data() // Include the document data
      }));
      return { records };
    } catch (error) {
      console.error('Error fetching records:', error);
      throw error;
    }
  }
  
  
  async function batchUpdateRecordsInFirestore(admin, records) {
      const db = admin.firestore();
      const collectionRef = db.collection('ig_msgs');
      const batch = db.batch();
      for (const record of records) {
          if (record.id) { // Check if a valid document ID exists
              const docRef = collectionRef.doc(record.id); // 'id' is the document ID
              const updateData = {
              syncStatus: true,
              syncDate: new Date().getTime()
          };
          batch.update(docRef, updateData);
          }
      }
      await batch.commit();
  }
  
  
  module.exports = { fetchRecordsFromFirestore, batchUpdateRecordsInFirestore };