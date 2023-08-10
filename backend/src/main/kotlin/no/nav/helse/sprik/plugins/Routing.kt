package no.nav.helse.sprik.plugins

import InnkommendeKommentar
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
import no.nav.helse.sprik.db.FeilmeldingRepository
import no.nav.helse.sprik.db.FeilmeldingTable
import no.nav.helse.sprik.modell.Feilmelding
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.update

fun configureRouting(): ApplicationEngine = embeddedServer(CIO, applicationEngineEnvironment {
    //Repositories for handlinger mot database:
    val feilmeldingRepository = FeilmeldingRepository()

    module {
        install(CORS) {
            anyHost()
            allowMethod(HttpMethod.Get)
            allowMethod(HttpMethod.Post)
            allowMethod(HttpMethod.Put)
            allowMethod(HttpMethod.Delete)
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
            get("/api/hentallefeil"){
                val testMelding = feilmeldingRepository.hentAlleFeilmeldinger()
                call.respond(status = HttpStatusCode.Created, message = testMelding)
            }
            get("/api/hentsok/{sokestreng}"){
                val sokestreng = call.parameters["sokestreng"]
                    ?: return@get call.respond(HttpStatusCode.BadRequest, "Sokestreng må være definert")
                val sokeresultat = feilmeldingRepository.hentSokteFeilmeldinger(sokestreng)
                call.respond(status = HttpStatusCode.Created, message = sokeresultat)
            }
            post("/api/nyfeil") {
                val feilmelding = call.receive<Feilmelding>()
                feilmeldingRepository.lagre(feilmelding)
                call.respond(status = HttpStatusCode.Created, message = "Feilmelding motatt og sendt til database")
            }
            put("/api/oppdaterfeil") {
                val oppdatertFeilmelding = call.receive<Feilmelding>()
                feilmeldingRepository.oppdaterFeilmelding(oppdatertFeilmelding)
                call.respond(status = HttpStatusCode.Created, message = "Feilmelding oppdatert")
            }
            put("/api/oppdaterkommentar") {
                val innkommendeKommentar = call.receive<InnkommendeKommentar>()
                feilmeldingRepository.oppdaterKommentar(innkommendeKommentar.id, innkommendeKommentar.kommentar)
                call.respond(status = HttpStatusCode.Created, message = "Feilmelding oppdatert")
            }
            delete("api/slettfeilmelding/{id}") {
                val id = call.parameters["id"]
                checkNotNull(id) {"Id kan ikke være null"}
                feilmeldingRepository.slettFeilmelding(id.toInt())
                call.respond(status = HttpStatusCode.Created, message = "Feilmelding slettet")
            }
        }
    }
    
    connector {
        port = 8080
    }
})