package no.nav.helse.sprik.db

import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction

class FeilmeldingRepository {
    fun lagre(tittel: String, beskrivelse: String){
        transaction {
            FeilmeldingTable.run {
                insert {
                    it[FeilmeldingTable.tittel] = tittel
                    it[FeilmeldingTable.beskrivelse] = beskrivelse
                }
            }
        }
    }
}