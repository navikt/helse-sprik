@file:UseSerializers(
        LocalDateSerializer::class
)

package no.nav.helse.sprik.modell
import kotlinx.serialization.Serializable
import kotlinx.serialization.UseSerializers
import no.nav.helse.sprik.serializers.LocalDateSerializer
import java.time.LocalDate




/**
 * Objekt for feilmeldinger i Sprik
 * */
@Serializable
class Feilmelding(
    val tittel: String,
    val beskrivelse: String,

    @Serializable(LocalDateSerializer::class)
    val dato: LocalDate? = null, //Krever en spesiallaget serialiserer i KotlinX
    val tags: ArrayList<String> = arrayListOf<String>()
    //val bilde: String,
) {
    fun addTag(tagText: String){
        tags.add(tagText)
    }

    fun removeTag(tagText: String){
        tags.removeAt(tags.indexOf(tagText))
    }

    override fun toString(): String {
        return "Feilmelding(\n${tittel}\n${beskrivelse}\n)"
    }
}
