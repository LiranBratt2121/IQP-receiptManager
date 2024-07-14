import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, FlatList, Alert, Platform, TouchableOpacity } from 'react-native';
import { doc, getDocs, collection, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from 'firebase/auth';
import { db, auth } from './firebase/firebaseConfig';

const App = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [contents, setContents] = useState<any[]>([]);

  const handleSignUp = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      showAlert('Invalid Phone Number', 'Please enter a valid phone number.');
      return;
    }

    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, `${phoneNumber}@IQP.com`, password);
      await setDoc(doc(db, 'users', phoneNumber), {});

      setUser(userCredentials.user);
      fetchUserContents(phoneNumber);
    } catch (error: any) {
      console.error('Error signing up: ', error);
      showAlert('Error', error.message);
    }
  };

  const handleSignIn = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      showAlert('Invalid Phone Number', 'Please enter a valid phone number.');
      return;
    }

    try {
      const userCredentials = await signInWithEmailAndPassword(auth, `${phoneNumber}@IQP.com`, password);
      setUser(userCredentials.user);
      fetchUserContents(phoneNumber);
    } catch (error: any) {
      console.error('Error signing in: ', error);
      showAlert('Error', error.message);
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setContents([]);
  };

  const fetchUserContents = async (phone: string) => {
    try {
      const contentsCollectionRef = collection(db, 'users', phone, 'contents');
      const contentsSnapshot = await getDocs(contentsCollectionRef);

      if (!contentsSnapshot.empty) {
        const contentsData = contentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setContents(contentsData);
      } else {
        showAlert('No Data Found', 'No content data found for the provided phone number.');
      }
    } catch (error: any) {
      console.error('Error fetching content data: ', error);
      showAlert('Error', error.message);
    }
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n\n${message}`);
    } else {
      Alert.alert(title, message, [{ text: 'OK' }], { cancelable: true });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>User Login</Text>
      {user ? (
        <View style={styles.userDataContainer}>
          <Text style={styles.userDataTitle}>User Content:</Text>
          {contents.length > 0 ? (
            <FlatList
              data={contents}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.itemText}>{`Content: ${item.content}`}</Text>
                  <Text style={styles.itemText}>{`Created: ${item.created}`}</Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.noDataText}>No content available</Text>
          )}
          <TouchableOpacity style={styles.backButton} onPress={handleSignOut}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            placeholderTextColor="#ccc"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry
            onChangeText={setPassword}
            placeholderTextColor="#ccc"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36393f',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 15,
    backgroundColor: '#2f3136',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#7289da',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#7289da',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  userDataContainer: {
    width: '100%',
    marginTop: 20,
  },
  userDataTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  item: {
    backgroundColor: '#42454a',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#fff',
  },
  noDataText: {
    color: '#fff',
  },
});

export default App;
