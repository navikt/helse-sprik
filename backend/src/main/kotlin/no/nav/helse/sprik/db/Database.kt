package no.nav.helse.sprik.db

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import no.nav.helse.sprik.db.Environment.Database.host
import no.nav.helse.sprik.db.Environment.Database.name
import no.nav.helse.sprik.db.Environment.Database.port
import org.flywaydb.core.Flyway
import kotlin.time.Duration.Companion.minutes
import kotlin.time.Duration.Companion.seconds
import kotlin.time.toJavaDuration

class Database(dbconfig: HikariConfig = dbconfig()) {
    val dataSource by lazy { HikariDataSource(dbconfig) }
    fun migrate() {
        migrateconfig()
            .let { HikariDataSource(it) }
            .also {
                Flyway.configure()
                        .dataSource(it)
                        .lockRetryCount(-1)
                        .load()
                        .migrate()
            }
            .close()
    }
}

private fun dbconfig() = HikariConfig().apply {
    jdbcUrl = DB_URL
    username = Environment.Database.username
    password = Environment.Database.password
    maximumPoolSize = 1
    connectionTimeout = 30.seconds.toJavaDuration().toMillis()
    initializationFailTimeout = 1.minutes.toJavaDuration().toMillis()
}

private fun migrateconfig() = HikariConfig().apply {
    jdbcUrl = DB_URL
    username = Environment.Database.username
    password = Environment.Database.password
    maximumPoolSize = 2
    connectionTimeout = 30.seconds.toJavaDuration().toMillis()
    initializationFailTimeout = 1.minutes.toJavaDuration().toMillis()
}

val DB_URL = "jdbc:postgresql://%s:%s/%s".format(host, port, name)

object Environment {
    object Database {
        private val env = System.getenv()
        internal val host = requireNotNull(env["DATABASE_HOST"]) { "Host må settes" }
        internal val port = requireNotNull(env["DATABASE_PORT"]) { "Port må settes" }
        internal val name = requireNotNull(env["DATABASE_DATABASE"]) { "Databasenavn må settes" }
        internal val username = requireNotNull(env["DATABASE_USERNAME"]) { "Brukernavn må settes" }
        internal val password = requireNotNull(env["DATABASE_PASSWORD"]) { "Passord må settes" }
    }
}