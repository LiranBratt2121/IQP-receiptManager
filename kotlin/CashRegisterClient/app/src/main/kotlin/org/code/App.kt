package org.code

fun main(args: Array<String>) {
    val receiptId = args[0].trim()
    val content = args[1].trim()

    if (receiptId.isEmpty()) {
        println("Receipt ID cannot be empty.")
        return
    }

    if (content.isEmpty()) {
        println("Content cannot be empty.")
        return
    }

    val fireStoreDb = DataBase("../receipt-reader-a8efb-firebase-adminsdk-8ff3e-5e4f1f1ef6.json")
    val success = fireStoreDb.saveToDb(receiptId, content)

    println(
            if (success) "Content saved successfully for receipt ID: $receiptId"
            else "Failed to save content for receipt ID: $receiptId"
    )
}
