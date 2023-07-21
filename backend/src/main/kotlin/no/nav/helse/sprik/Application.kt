package no.nav.helse.sprik

import kotlinx.coroutines.runBlocking
import no.nav.helse.sprik.db.Database
import org.jetbrains.exposed.sql.Database as ExposedDatabase

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
            ExposedDatabase.connect(db.dataSource)
            configureRouting().start(wait = true)
            Runtime.getRuntime().addShutdownHook(
                Thread {
                    db.dataSource.close()
                }
            )
        }
    }
}
