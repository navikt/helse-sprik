@file:UseSerializers(
        LocalDateTimeSerializer::class
)

package no.nav.helse.sprik.modell
import kotlinx.serialization.Serializable
import kotlinx.serialization.UseSerializers
import no.nav.helse.sprik.serializers.LocalDateTimeSerializer
import java.time.LocalDateTime


/**
 * Objekt for feilmeldinger i Sprik
 * */
@Serializable
data class Feilmelding(
    val id: Int?,
    val tittel: String,
    val beskrivelse: String,
    val dato: LocalDateTime, //Krever en spesiallaget serialiserer i KotlinX
    val arbeidsstatus: Int,
    val haster: Boolean,
    val kommentar: String?,
    val aktorid: Long?
    //val bilde: String,
) {
    override fun toString(): String {
        return "Feilmelding(\n${tittel}\n${beskrivelse}\n)"
    }
}
