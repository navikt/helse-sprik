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
    fun `Lagrer feilmelding i databasen`() {
        feilmeldingRepository.lagre("test", "testesen")
        transaction {
            val actual = FeilmeldingTable.selectAll().single()
            assertEquals("test", actual[FeilmeldingTable.tittel])
            assertEquals("testesen", actual[FeilmeldingTable.beskrivelse])
        }
    }

    @Test
    fun `Sett opp testdatabasen riktig`(){
        feilmeldingRepository.lagre("Hællæ", "skjera bagera")
        transaction {
            assertEquals(1, FeilmeldingTable.selectAll().map {
                it
            }.size)
        }
    }
}