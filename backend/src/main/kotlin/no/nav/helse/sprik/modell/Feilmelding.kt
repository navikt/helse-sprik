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
class Feilmelding(
    val tittel: String,
    val beskrivelse: String,
    val dato: LocalDateTime, //Krever en spesiallaget serialiserer i KotlinX
    //val tags: ArrayList<String> = arrayListOf<String>()
    //val bilde: String,
) {
    override fun toString(): String {
        return "Feilmelding(\n${tittel}\n${beskrivelse}\n)"
    }
}
