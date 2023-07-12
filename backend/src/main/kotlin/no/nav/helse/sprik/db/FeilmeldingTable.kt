package no.nav.helse.sprik.db

import org.jetbrains.exposed.sql.Table
import org.jetbrains.exposed.sql.javatime.datetime

object FeilmeldingTable : Table("feilmelding") {
    val tittel = text("tittel")
    val beskrivelse = text("beskrivelse")
    val dato = datetime("dato")
}