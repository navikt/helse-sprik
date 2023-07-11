package no.nav.helse.sprik

import com.zaxxer.hikari.HikariConfig
import no.nav.helse.sprik.db.Database
import no.nav.helse.sprik.db.FeilmeldingRepository
import no.nav.helse.sprik.db.FeilmeldingTable
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
        feilmeldingRepository.lagre("Hællæ", "skjera bagera", LocalDateTime.of(2000,1,1,8,0))
        transaction {
            assertEquals(1, FeilmeldingTable.selectAll().map {
                it
            }.size)
        }
    }

    @Test
    fun `Lagrer feilmelding i databasen`() {
        feilmeldingRepository.lagre("test", "testesen", LocalDateTime.of(2000,1,1,8,0))
        transaction {
            val actual = FeilmeldingTable.selectAll().single()
            assertEquals("test", actual[FeilmeldingTable.tittel])
            assertEquals("testesen", actual[FeilmeldingTable.beskrivelse])
            assertEquals(LocalDateTime.of(2023, 1, 1, 8, 0), actual[FeilmeldingTable.dato])
        }
    }

}