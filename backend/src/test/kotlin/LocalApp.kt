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

    oppretteMockData() // WIP

    app.startBlocking()
}

private fun oppretteMockData() {
    val feilmeldingRepository = FeilmeldingRepository()
    feilmeldingRepository.lagre(Feilmelding(null, "Mangel på hensyn til tariffoppgjør", "Det har vært ett tariffoppgjør og speil sier sykepengene må tilbakekreves, noe som er feil. (sier vi.. har ikke domenekunnskap)", LocalDateTime.of(2023, 1, 1, 8, 0, 0), 0, false, null))
    feilmeldingRepository.lagre(Feilmelding(null, "Speil sier NAV må tilbakekreve sykepenger på feil grunnlag", "Beskrivelse Test2", LocalDateTime.of(2023, 2, 1, 8, 0, 0), 1, true, null))
    feilmeldingRepository.lagre(Feilmelding(null, "Feil A", "Lorem Ipsum", LocalDateTime.of(2023, 3, 1, 8, 0, 0), 2, false, null))
    feilmeldingRepository.lagre(Feilmelding(null, "Feil B", "Lorem Ipsum", LocalDateTime.of(2023, 4, 1, 8, 0, 0), 1, true, null))
    feilmeldingRepository.lagre(Feilmelding(null, "Feil C", "Lorem Ipsum", LocalDateTime.of(2023, 5, 1, 8, 0, 0), 1, true, null))
    feilmeldingRepository.lagre(Feilmelding(null, "Feil D", "Lorem Ipsum", LocalDateTime.of(2023, 6, 1, 8, 0, 0), 0, false, "Test kommentar"))
}
