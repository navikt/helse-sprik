package no.nav.helse.sprik.db

import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime

class FeilmeldingRepository {
    fun lagre(tittel: String, beskrivelse: String, dato: LocalDateTime){
        transaction {
            FeilmeldingTable.run {
                insert {
                    it[FeilmeldingTable.tittel] = tittel
                    it[FeilmeldingTable.beskrivelse] = beskrivelse
                    it[FeilmeldingTable.dato] = dato
                }
            }
        }
    }
}