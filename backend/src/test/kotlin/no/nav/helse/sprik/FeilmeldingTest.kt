package no.nav.helse.sprik

import com.zaxxer.hikari.HikariConfig
import no.nav.helse.sprik.db.Database
import no.nav.helse.sprik.db.FeilmeldingRepository
import no.nav.helse.sprik.db.FeilmeldingTable
import no.nav.helse.sprik.modell.Feilmelding
import org.jetbrains.exposed.sql.deleteAll
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.transactions.transaction
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import java.time.LocalDateTime
import kotlin.test.assertEquals
import org.jetbrains.exposed.sql.Database as ExposedDatabase


@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class FeilmeldingTest {
    private val database = Database(dbconfig()).configureFlyway()
    private val feilmeldingRepository = FeilmeldingRepository()
    private val feilmelding = Feilmelding("Test", "Testesen", LocalDateTime.of(2023,1,1,8,0))
    private val feilmelding2 = Feilmelding("Tittel", "Beskrivelse", LocalDateTime.of(2023,2,1,8,0))

    @BeforeAll
    fun setup() {
        ExposedDatabase.connect(database.dataSource)
        feilmeldingRepository.lagre(feilmelding)

    }
    @AfterEach
    fun wipe() {
        transaction {
            FeilmeldingTable.deleteAll()
        }
    }
    @Test
    fun `Sett opp testdatabasen riktig`(){
        transaction {
            assertEquals(1, FeilmeldingTable.selectAll().map {
                it
            }.size)
        }
    }

    @Test
    fun `Lagrer feilmelding i databasen`() {
        transaction {
            val actual = FeilmeldingTable.selectAll().single()
            assertEquals("Test", actual[FeilmeldingTable.tittel])
            assertEquals("Testesen", actual[FeilmeldingTable.beskrivelse])
            assertEquals(LocalDateTime.of(2023, 1, 1, 8, 0), actual[FeilmeldingTable.dato])
        }
    }

    @Test
    fun `Henter alle feilmeldinger i databasen`() {
        transaction {
            val resultat: List<Feilmelding> = feilmeldingRepository.hentAlleFeilmeldinger()
            val actual = FeilmeldingTable.selectAll()
            assertEquals(actual.map { it }.size, resultat.size)
            assertEquals("Test", resultat[0].tittel)
            assertEquals("Testesen", resultat[0].beskrivelse)
            assertEquals(LocalDateTime.of(2023, 1, 1, 8, 0), resultat[0].dato)
        }
    }

    @Test
    fun `Henter feilmeldinger som matcher søk`() {
        val sokeresultat: List<Feilmelding> = feilmeldingRepository.hentSokteFeilmeldinger("Test")
        assertEquals(1, sokeresultat.size)
        assertEquals("Test", sokeresultat[0].tittel)
        assertEquals("Testesen", sokeresultat[0].beskrivelse)
    }

    @Test
    fun `Henter feilmeldinger som har søkestreng som substreng`() {
        val sokeresultat: List<Feilmelding> = feilmeldingRepository.hentSokteFeilmeldinger("Teste")
        assertEquals(1, sokeresultat.size)
        assertEquals("Test", sokeresultat[0].tittel)
        assertEquals("Testesen", sokeresultat[0].beskrivelse)
    }

    @Test
    fun `Finner ingen feilmeldinger som matcher søk`() {
        val sokeresultat: List<Feilmelding> = feilmeldingRepository.hentSokteFeilmeldinger("abrakadabra")
        assertEquals(0, sokeresultat.size)
    }
}