package org.code

import com.google.auth.oauth2.GoogleCredentials
import com.google.cloud.firestore.Firestore
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import com.google.firebase.cloud.FirestoreClient
import java.io.FileInputStream
import java.io.InputStream
import org.code.ContentData

class DataBase(secretFilePath: String) {
    private val m_serviceAccount: InputStream
    private val m_credentials: GoogleCredentials
    private val m_database: Firestore

    init {
        m_serviceAccount = FileInputStream(secretFilePath)
        m_credentials = GoogleCredentials.fromStream(m_serviceAccount)

        val options = FirebaseOptions.builder().setCredentials(m_credentials).build()

        FirebaseApp.initializeApp(options)
        m_database = FirestoreClient.getFirestore()
    }

    fun getDB(): Firestore {
        return m_database
    }

    fun saveToDb(clientId: String, content: String): Boolean {
        val contentsCollectionRef = m_database.collection("users").document(clientId).collection("contents")
        val contentData = ContentData(content)

        return try {
            contentsCollectionRef.add(contentData).get()
            true
        } catch (e: Exception) {
            e.printStackTrace()
            false
        }
    }
}
