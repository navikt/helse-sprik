package no.nav.helse.sprik.plugins

import io.ktor.http.*
import io.ktor.server.routing.*
import io.ktor.server.response.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.cio.*
import io.ktor.server.engine.*
import io.ktor.server.http.content.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.request.*
import no.nav.helse.sprik.Test
import no.nav.helse.sprik.db.FeilmeldingRepository
import no.nav.helse.sprik.modell.Feilmelding

fun configureRouting(): ApplicationEngine = embeddedServer(CIO, applicationEngineEnvironment {
    //Repositories for handlinger mot database:
    val feilmeldingRepository = FeilmeldingRepository()

    module {
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
            singlePageApplication{
                useResources = true
                filesPath = "frontend/dist"
                defaultPage = "index.html"
                ignoreFiles {
                    it.endsWith(".txt")
                }
            }
            get("/isalive"){
                call.respondText("ALIVE")
            }
            get("/isready"){
                call.respondText("READY")
            }
            get("/api/test") {
                call.respondText("test")
            }
            post("/test") {
                val test = call.receive<Test>()
                call.respond(status = HttpStatusCode.Created, message = test)
            }
            post("/api/nyfeil") {
                val feilmelding = call.receive<Feilmelding>()
                feilmeldingRepository.lagre(feilmelding)
                call.respond(status = HttpStatusCode.Created, message = "Feilmelding motatt og sendt til database")
            }
            get("/api/hentfeil"){
                call.respond(status = HttpStatusCode.Created, message = "Prøver å hente feil fra DB")
            }
        }
    }
    connector {
        port = 8080
    }
})


