package no.nav.helse.sprik

import com.zaxxer.hikari.HikariConfig
import no.nav.helse.sprik.db.Database
import no.nav.helse.sprik.db.FeilmeldingRepository
import no.nav.helse.sprik.db.FeilmeldingTable
import no.nav.helse.sprik.modell.Feilmelding
import org.jetbrains.exposed.sql.deleteAll
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import org.junit.jupiter.api.*
import org.junit.jupiter.api.Test
import java.time.LocalDateTime
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertNull
import org.jetbrains.exposed.sql.Database as ExposedDatabase

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class FeilmeldingTest {
    private val database = Database(dbconfig()).configureFlyway()
    private val feilmeldingRepository = FeilmeldingRepository()
    private companion object {
        val feilmelding = Feilmelding(
            null,
            "Test",
            "Testesen",
            1.januar,
            0,
            true,
            null,
            null
        )
    }

    fun getId() = transaction {
        FeilmeldingTable.selectAll().single()[FeilmeldingTable.id]
    }

    @BeforeAll
    fun setup() {
        ExposedDatabase.connect(database.dataSource)
    }

    @AfterEach
    fun wipe() {
        transaction {
            FeilmeldingTable.deleteAll()
        }
    }

    @Test
    fun `Sett opp testdatabasen riktig`(){
        feilmeldingRepository.lagre(feilmelding)
        transaction {
            assertEquals(1, FeilmeldingTable.selectAll().map {
                it
            }.size)
        }
    }

    @Test
    fun `Lagrer feilmelding uten aktørid i databasen`() {
        feilmeldingRepository.lagre(feilmelding)
        transaction {
            val forventetFeilmelding = Feilmelding(
                getId(),
                "Test",
                "Testesen",
                1.januar,
                0,
                true,
                null,
                null
            )
            val faktiskFeilmelding = feilmeldingRepository.radTilFeilmelding(FeilmeldingTable.selectAll().single())
            assertEquals(forventetFeilmelding, faktiskFeilmelding)
        }
    }

    @Test
    fun `Lagrer feilmelding med aktørid i databasen`() {
        feilmeldingRepository.lagre(feilmelding.copy(aktorid = 12345678))
        transaction {
            val forventetFeilmelding = Feilmelding(
                getId(),
                "Test",
                "Testesen",
                1.januar,
                0,
                true,
                null,
                12345678
            )
            val faktiskFeilmelding = feilmeldingRepository.radTilFeilmelding(FeilmeldingTable.selectAll().single())
            assertEquals(forventetFeilmelding, faktiskFeilmelding)
        }
    }

    @Test
    fun `Henter alle feilmeldinger i databasen`() {
        feilmeldingRepository.lagre(feilmelding)
        feilmeldingRepository.lagre(feilmelding)
        transaction {
            val resultat: List<Feilmelding> = feilmeldingRepository.hentAlleFeilmeldinger()
            val forventet = FeilmeldingTable.selectAll().map { it }
            assertEquals(forventet.size, resultat.size)
        }
    }

    @Test
    fun `Henter feilmeldinger som matcher søk`() {
        feilmeldingRepository.lagre(feilmelding)
        val sokeresultat: List<Feilmelding> = feilmeldingRepository.hentSokteFeilmeldinger("Test")
        assertEquals(1, sokeresultat.size)
    }

    @Test
    fun `Henter alle feilmeldinger som har søkestreng som substreng`() {
        feilmeldingRepository.lagre(feilmelding)
        feilmeldingRepository.lagre(feilmelding.copy(tittel = "Heste"))
        val sokeresultat: List<Feilmelding> = feilmeldingRepository.hentSokteFeilmeldinger("este")
        assertEquals(2, sokeresultat.size)
    }

    @Test
    fun `Finner ingen feilmeldinger som matcher søk`() {
        feilmeldingRepository.lagre(feilmelding)
        val sokeresultat: List<Feilmelding> = feilmeldingRepository.hentSokteFeilmeldinger("abrakadabra")
        assertEquals(0, sokeresultat.size)
    }

    @Test
    fun `Søk er ikke case sensitivt`() {
        feilmeldingRepository.lagre(feilmelding)
        val sokeresultat: List<Feilmelding> = feilmeldingRepository.hentSokteFeilmeldinger("test")
        assertEquals(1, sokeresultat.size)
    }

    @Test
    fun `Søk er ikke mellomrom-sensitiv`() {
        feilmeldingRepository.lagre(feilmelding)
        val sokeresultat: List<Feilmelding> = feilmeldingRepository.hentSokteFeilmeldinger("Test ")
        assertEquals(1, sokeresultat.size)
    }

    @Test
    fun `Oppdaterer en feilmelding`() {
        feilmeldingRepository.lagre(feilmelding)
        val oppdatertFeilmelding = Feilmelding(getId(), "Oppdatert", "Oppdatert feil", 1.januar, 1, false, null, null)
        feilmeldingRepository.oppdaterFeilmelding(oppdatertFeilmelding)
        val actualOppdatert = transaction { FeilmeldingTable.selectAll().single() }
        assertEquals("Oppdatert", actualOppdatert[FeilmeldingTable.tittel])
        assertEquals("Oppdatert feil", actualOppdatert[FeilmeldingTable.beskrivelse])
        assertFalse ( actualOppdatert[FeilmeldingTable.haster] )
        assertEquals(1, actualOppdatert[FeilmeldingTable.arbeidsstatus])
    }

    @Test
    fun `Prøver å oppdatere feilmelding uten id`() {
        feilmeldingRepository.lagre(feilmelding)
        val oppdatertFeilmelding = Feilmelding(null, "Oppdatert", "Oppdatert feil", 1.januar, 1, false, null, null)
        assertThrows<IllegalStateException> {
            feilmeldingRepository.oppdaterFeilmelding(oppdatertFeilmelding)
        }
    }

    @Test
    fun `Kommentar er tom når feilmelding opprettes`() {
        feilmeldingRepository.lagre(feilmelding)
        val initiellKommentar = transaction { FeilmeldingTable.selectAll().single()[FeilmeldingTable.kommentar] }
        assertNull(initiellKommentar)
    }

    @Test
    fun `Oppdaterer feilmeldingskommentar`() {
        feilmeldingRepository.lagre(feilmelding)
        feilmeldingRepository.oppdaterKommentar(getId(), "Feilen fikses nå!")
        val oppdatertKommentar = transaction { FeilmeldingTable.selectAll().single()[FeilmeldingTable.kommentar] }
        assertEquals("Feilen fikses nå!", oppdatertKommentar)
    }

    @Test
    fun `Ny kommentar skal overskrive gammel`() {
        feilmeldingRepository.lagre(feilmelding)
        feilmeldingRepository.oppdaterKommentar(getId(), "Initiell kommentar")
        feilmeldingRepository.oppdaterKommentar(getId(), "Oppdatert kommentar")
        val oppdatertKommentar = transaction { FeilmeldingTable.selectAll().single()[FeilmeldingTable.kommentar] }
        assertEquals("Oppdatert kommentar", oppdatertKommentar)
    }

    @Test
    fun `Feilmelding slettes basert på id`() {
        feilmeldingRepository.lagre(feilmelding)
        feilmeldingRepository.slettFeilmelding(getId())
        val resultat = transaction { FeilmeldingTable.selectAll().map { it }.size }
        assertEquals(0, resultat)
    }
}