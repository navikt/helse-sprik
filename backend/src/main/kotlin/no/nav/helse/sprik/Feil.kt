package no.nav.helse.sprik

import kotlinx.serialization.Serializable

@Serializable
data class Feil(
    val tittel: String,
    val beskrivelse: String,
) {
    override fun toString(): String {
        return "Feil(${tittel}\n${beskrivelse})"
    }
}
