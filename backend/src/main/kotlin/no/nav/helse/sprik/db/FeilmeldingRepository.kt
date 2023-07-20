package no.nav.helse.sprik.db

import com.typesafe.config.ConfigException.Null
import no.nav.helse.sprik.db.FeilmeldingTable.beskrivelse
import no.nav.helse.sprik.db.FeilmeldingTable.dato
import no.nav.helse.sprik.db.FeilmeldingTable.tittel
import no.nav.helse.sprik.modell.Feilmelding
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import java.time.LocalDateTime

class FeilmeldingRepository {
    fun lagre(feilmelding: Feilmelding) {
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

    private fun radTilFeilmelding(rad: ResultRow) = Feilmelding(
        tittel = rad[tittel],
        beskrivelse = rad[beskrivelse],
        dato = rad[dato]
    )

    fun hentAlleFeilmeldinger(): List<Feilmelding> = transaction {
        FeilmeldingTable.selectAll().map(::radTilFeilmelding)
    }
}
