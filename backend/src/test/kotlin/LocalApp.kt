import no.nav.helse.sprik.Application
import no.nav.helse.sprik.configureFlyway
import no.nav.helse.sprik.db.Database
import no.nav.helse.sprik.db.FeilmeldingRepository
import no.nav.helse.sprik.dbconfig
import no.nav.helse.sprik.modell.Feilmelding
import java.time.LocalDateTime
import javax.sql.DataSource
import org.jetbrains.exposed.sql.Database as ExposedDatabase



fun main() {

    val db = Database(dbconfig()).configureFlyway()
    val app = Application(db)
    ExposedDatabase.connect(db.dataSource)


    oppretteMockData(db.dataSource) // WIP

    app.startBlocking()
}

private fun oppretteMockData(dataSource: DataSource) {
    //må lage connection med database først!
    val feilmeldingRepository = FeilmeldingRepository()
    feilmeldingRepository.lagre(Feilmelding("Tittel Test1", "Beskrivelse Test1", LocalDateTime.of(2023, 1, 1, 8, 0, 0)))
    feilmeldingRepository.lagre(Feilmelding("Tittel Test2", "Beskrivelse Test2", LocalDateTime.of(2023, 1, 1, 8, 0, 0)))
    feilmeldingRepository.lagre(Feilmelding("Tittel Test3", "Beskrivelse Test3", LocalDateTime.of(2023, 1, 1, 8, 0, 0)))
    feilmeldingRepository.lagre(Feilmelding("Tittel Test4", "Beskrivelse Test4", LocalDateTime.of(2023, 1, 1, 8, 0, 0)))
    feilmeldingRepository.lagre(Feilmelding("Tittel Test5", "Beskrivelse Test5", LocalDateTime.of(2023, 1, 1, 8, 0, 0)))
    feilmeldingRepository.lagre(Feilmelding("Tittel Test6", "Beskrivelse Test6", LocalDateTime.of(2023, 1, 1, 8, 0, 0)))
}
