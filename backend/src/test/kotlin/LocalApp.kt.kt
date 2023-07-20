import no.nav.helse.sprik.Application
import no.nav.helse.sprik.configureFlyway
import no.nav.helse.sprik.db.Database
import no.nav.helse.sprik.dbconfig


fun main() {

    val db = Database(dbconfig()).configureFlyway()
    val app = Application(db)

    app.startBlocking()
}
