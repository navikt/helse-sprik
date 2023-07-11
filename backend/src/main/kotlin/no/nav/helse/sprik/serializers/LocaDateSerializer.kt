package no.nav.helse.sprik.serializers

import java.time.LocalDate

object LocalDateSerializer : AsStringSerializer<LocalDate>(
        serialName = "Sprik.kotlinx.LocalDateSerializer",
        parse = LocalDate::parse
)