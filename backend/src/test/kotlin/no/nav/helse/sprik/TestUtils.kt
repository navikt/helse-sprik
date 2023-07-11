package no.nav.helse.sprik

import com.zaxxer.hikari.HikariConfig
import no.nav.helse.sprik.db.Database
import org.flywaydb.core.Flyway
import org.junit.jupiter.api.Test
import org.testcontainers.containers.PostgreSQLContainer
import kotlin.test.assertEquals

// Lager Docker-container som databasen kan kjør på, og setter opp env-variabler for oss
fun postgres() = PostgreSQLContainer<Nothing>("postgres:15").apply {
    withReuse(true)
    withLabel("App", "db")
    start()
    println("Databasen har startet opp på port $firstMappedPort")
}

// Lager en testconfig for oss for å connecte til databasen
fun dbconfig(): HikariConfig {
    val postgres = postgres()
    return HikariConfig().apply {
        jdbcUrl = postgres.jdbcUrl
        username = postgres.username
        password = postgres.password
        maximumPoolSize = 2
        minimumIdle = 1
        idleTimeout = 500000
        connectionTimeout = 10000
        maxLifetime = 600000
        initializationFailTimeout = 5000
    }
}

// Migrerer databasen
fun Database.configureFlyway(): Database = this.also { database ->
    Flyway.configure()
        .dataSource(database.dataSource)
        .failOnMissingLocations(true)
        .cleanDisabled(false)
        .load()
        .also(Flyway::clean)
        .migrate()
}