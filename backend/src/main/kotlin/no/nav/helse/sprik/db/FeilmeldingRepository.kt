package no.nav.helse.sprik.db

import no.nav.helse.sprik.modell.Feilmelding
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime

class FeilmeldingRepository {
    fun lagre(feilmelding: Feilmelding){
        transaction {
            FeilmeldingTable.run {
                insert {
                    it[FeilmeldingTable.tittel] = feilmelding.tittel
                    it[FeilmeldingTable.beskrivelse] = feilmelding.beskrivelse
                    it[FeilmeldingTable.dato] = feilmelding.dato
                }
            }
        }
    }


}