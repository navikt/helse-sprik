package no.nav.helse.sprik.plugins

import io.ktor.http.*
import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.request.*
import no.nav.helse.sprik.Test

fun Application.configureRouting() {
    install(CORS) {
        anyHost()
        allowMethod(HttpMethod.Get)
        allowMethod(HttpMethod.Post)
        allowNonSimpleContentTypes = true
    }
    install(ContentNegotiation) {
        json()
    }
    routing {
        get("/") {
            call.respondText("Hello World!")
        }
        post("/test") {
            val test = call.receive<Test>()
            println(test)
            call.respond(status = HttpStatusCode.Created, message = test)
        }
    }
}
