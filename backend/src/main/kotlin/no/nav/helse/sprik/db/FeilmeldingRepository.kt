package no.nav.helse.sprik.db

import no.nav.helse.sprik.db.FeilmeldingTable.arbeidsstatus
import no.nav.helse.sprik.db.FeilmeldingTable.beskrivelse
import no.nav.helse.sprik.db.FeilmeldingTable.dato
import no.nav.helse.sprik.db.FeilmeldingTable.haster
import no.nav.helse.sprik.db.FeilmeldingTable.id
import no.nav.helse.sprik.db.FeilmeldingTable.kommentar
import no.nav.helse.sprik.db.FeilmeldingTable.tittel
import no.nav.helse.sprik.modell.Feilmelding
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.like
import org.jetbrains.exposed.sql.transactions.transaction

class FeilmeldingRepository {
    fun lagre(feilmelding: Feilmelding) {
        transaction {
            FeilmeldingTable.run {
                insert {
                    it[FeilmeldingTable.tittel] = feilmelding.tittel
                    it[FeilmeldingTable.beskrivelse] = feilmelding.beskrivelse
                    it[FeilmeldingTable.dato] = feilmelding.dato
                    it[FeilmeldingTable.arbeidsstatus] = feilmelding.arbeidsstatus
                    it[FeilmeldingTable.haster] = feilmelding.haster
                }
            }
        }
    }

    private fun radTilFeilmelding(rad: ResultRow) = Feilmelding(
        id = rad[id],
        tittel = rad[tittel],
        beskrivelse = rad[beskrivelse],
        dato = rad[dato],
        arbeidsstatus = rad[arbeidsstatus],
        haster = rad[haster],
        kommentar = rad[kommentar]
    )

    fun hentAlleFeilmeldinger(): List<Feilmelding> = transaction {
        FeilmeldingTable.selectAll().map(::radTilFeilmelding)
    }

    fun hentSokteFeilmeldinger(sokeord: String): List<Feilmelding> = transaction {
        val sok = "%${sokeord.lowercase()}%"

        FeilmeldingTable.select(
            (FeilmeldingTable.tittel.lowerCase() like sok)
                    or (FeilmeldingTable.beskrivelse.lowerCase() like sok)
        )
            .map(::radTilFeilmelding)
    }

    fun oppdaterFeilmelding(feilmelding: Feilmelding) = transaction {
        val id = feilmelding.id
        if (id != null) {
            FeilmeldingTable.update({ FeilmeldingTable.id eq id }) {
                it[FeilmeldingTable.tittel] = feilmelding.tittel
                it[FeilmeldingTable.beskrivelse] = feilmelding.beskrivelse
                it[FeilmeldingTable.arbeidsstatus] = feilmelding.arbeidsstatus
                it[FeilmeldingTable.haster] = feilmelding.haster
            }
        }
    }

    fun oppdaterKommentar(id: Int, kommentar: String) = transaction {
        FeilmeldingTable.update({ FeilmeldingTable.id eq id }) {
            it[FeilmeldingTable.kommentar] = kommentar
        }
    }
}
