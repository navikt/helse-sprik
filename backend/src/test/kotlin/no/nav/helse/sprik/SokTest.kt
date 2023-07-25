package no.nav.helse.sprik

import no.nav.helse.sprik.db.Database
import no.nav.helse.sprik.db.FeilmeldingRepository
import no.nav.helse.sprik.modell.Feilmelding
import no.nav.helse.sprik.modell.Sokemotor
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import java.time.LocalDateTime
import kotlin.test.assertEquals
import org.jetbrains.exposed.sql.Database as ExposedDatabase

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class SokTest {
    private val database = Database(dbconfig()).configureFlyway()
    private val sokemotor = Sokemotor()
    private val feilmeldingRepository = FeilmeldingRepository()
    private val feilmelding = Feilmelding("Test", "Testesen", LocalDateTime.of(2023,1,1,8,0))
    private val feilmelding2 = Feilmelding("Tittel", "Beskrivelse", LocalDateTime.of(2023,2,1,8,0))

    @BeforeAll
    fun setup() {
        ExposedDatabase.connect(database.dataSource)
        feilmeldingRepository.lagre(feilmelding)
        feilmeldingRepository.lagre(feilmelding2)
    }

    @Test
    fun `Søk etter nøkkelord i titler`() {
        val sokeresultat = sokemotor.sok("Test")
        assertEquals(1, sokeresultat.size)
        assertEquals(sokeresultat[0].tittel, "Test")
    }

    @Test
    fun `Søk etter nøkkelord i beskrivelser`() {
        val sokeresultat = sokemotor.sok("Beskrivelse")
        assertEquals(1, sokeresultat.size)
        assertEquals(sokeresultat[0].beskrivelse, "Beskrivelse")
    }

    /*
    @Test
    fun `Søk etter kategorier`() {
        TODO()
    }
    */
}