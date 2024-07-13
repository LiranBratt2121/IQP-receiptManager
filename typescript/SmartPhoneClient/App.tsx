import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/firebaseConfig';

const App = () => {
  const [collectionName, setCollectionName] = useState('');
  const [documents, setDocuments] = useState<any[]>([]);

  const fetchCollection = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDocuments(docs);
    } catch (error) {
      console.error('Error fetching collection: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Receipts</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter collection name"
        value={collectionName}
        onChangeText={setCollectionName}
      />
      <Button title="Fetch Collection" onPress={fetchCollection} />
      <FlatList
        data={documents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{JSON.stringify(item)}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default App;
