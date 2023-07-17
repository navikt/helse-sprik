package no.nav.helse.sprik.serializers

import java.time.LocalDateTime

object LocalDateTimeSerializer : AsStringSerializer<LocalDateTime>(
        serialName = "Sprik.kotlinx.LocalDateTimeSerializer",
        parse = LocalDateTime::parse
)