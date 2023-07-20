import no.nav.helse.sprik.Application
import no.nav.helse.sprik.configureFlyway
import no.nav.helse.sprik.db.Database
import no.nav.helse.sprik.db.FeilmeldingRepository
import no.nav.helse.sprik.dbconfig
import no.nav.helse.sprik.modell.Feilmelding
import org.intellij.lang.annotations.Language
import java.time.LocalDateTime
import javax.sql.DataSource


fun main() {

    val db = Database(dbconfig()).configureFlyway()
    val app = Application(db)

    oppretteMockData(db.dataSource)

    app.startBlocking()
}

private fun oppretteMockData(dataSource: DataSource) {
    val feilmeldingRepository = FeilmeldingRepository()
    feilmeldingRepository.lagre(Feilmelding("Tittel Test", "Beskrivelse Test", LocalDateTime.of(2023, 1, 1, 8, 0, 0)))
}