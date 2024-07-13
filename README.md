# IQP-receiptManager

![concept](concept.png)

## Firebase Configuration
Add inside `typescript\SmartPhoneClient\firebase` dir a file named `secretFirebaseConfig.ts`
```ts
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

export default firebaseConfig;
```

Go to your (firebase project settings)[https://console.firebase.google.com/u/0/project/receipt-reader-a8efb/settings/general/web:NDYxY2QyYzQtNTMwMC00Njc0LTljMWItMWFiYjE0NjZlMzkw] and get a json file represnting the config and put it inside `kotlin\CashRegisterClient`.
Inside App.kt adjust the marked part of the path as needed

```kotlin
    val fireStoreDb = DataBase("../***<receipt-reader-a8efb-firebase-adminsdk-8ff3e-5e4f1f1ef6.json>***")
```

