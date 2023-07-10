package no.nav.helse.sprik.db

import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import no.nav.helse.sprik.db.Environment.Database.host
import no.nav.helse.sprik.db.Environment.Database.name
import no.nav.helse.sprik.db.Environment.Database.port

class Database(dbconfig: HikariConfig) {
    val dataSource by lazy { HikariDataSource(dbconfig) }
}

private fun dbconfig() = HikariConfig().apply {
    jdbcUrl = DB_URL
}

val DB_URL = "jdbc:postgresql://%s:%s/%s".format(host, port, name)

object Environment {
    object Database {
        private val env = System.getenv()
        val host = requireNotNull(env["DATABASE_HOST"]) { "Host må settes" }
        val port = requireNotNull(env["DATABASE_PORT"]) { "Port må settes" }
        val name = requireNotNull(env["DATABASE_DATABASE"]) { "Databasenavn må settes" }
    }
}