package no.nav.helse.sprik.plugins

import io.ktor.http.*
import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.plugins.cors.routing.*

fun Application.configureRouting() {
    install(CORS) {
        anyHost()
        allowMethod(HttpMethod.Get)
    }
    routing {
        get("/") {
            call.respondText("Hello World!")
        }
    }
}
