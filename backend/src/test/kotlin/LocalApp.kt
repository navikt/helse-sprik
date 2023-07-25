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
    val feilmeldingRepository = FeilmeldingRepository()
    feilmeldingRepository.lagre(Feilmelding("Mangel på hensyn til tariffoppgjør", "Det har vært ett tariffoppgjør og speil sier sykepengene må tilbakekreves, noe som er feil. (sier vi.. har ikke domenekunnskap)", LocalDateTime.of(2023, 1, 1, 8, 0, 0)))
    feilmeldingRepository.lagre(Feilmelding("Speil sier NAV må tilbakekreve sykepenger på feil grunnlag", "Beskrivelse Test2", LocalDateTime.of(2023, 2, 1, 8, 0, 0)))
    feilmeldingRepository.lagre(Feilmelding("Feil A", "Lorem Ipsum", LocalDateTime.of(2023, 3, 1, 8, 0, 0)))
    feilmeldingRepository.lagre(Feilmelding("Feil B", "Lorem Ipsum", LocalDateTime.of(2023, 4, 1, 8, 0, 0)))
    feilmeldingRepository.lagre(Feilmelding("Feil C", "Lorem Ipsum", LocalDateTime.of(2023, 5, 1, 8, 0, 0)))
    feilmeldingRepository.lagre(Feilmelding("Feil D", "Lorem Ipsum", LocalDateTime.of(2023, 6, 1, 8, 0, 0)))
}
