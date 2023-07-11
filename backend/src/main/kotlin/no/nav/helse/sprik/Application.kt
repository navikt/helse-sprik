package no.nav.helse.sprik

import kotlinx.coroutines.runBlocking
import no.nav.helse.sprik.db.Database
import no.nav.helse.sprik.plugins.*

fun main() {
    val db = Database()
    db.migrate()
    val app = Application(db)
    app.startBlocking()
}

class Application(private val db: Database) {
    fun startBlocking() {

        runBlocking {
            configureRouting().start(wait = false)
            Runtime.getRuntime().addShutdownHook(
                Thread {
                    db.dataSource.close()
                }
            )
        }
    }
}
