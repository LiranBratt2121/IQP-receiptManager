package org.code

import java.time.LocalDateTime

data class ContentData(
        val content: String = "",
        val created: String = LocalDateTime.now().toString()
)
