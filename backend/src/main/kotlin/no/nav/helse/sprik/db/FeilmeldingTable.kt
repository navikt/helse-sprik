package no.nav.helse.sprik.db

import org.jetbrains.exposed.sql.Table

object FeilmeldingTable : Table("feilmelding") {
    val tittel = text("tittel")
    val beskrivelse = text("beskrivelse")
}