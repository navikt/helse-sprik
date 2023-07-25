package no.nav.helse.sprik.modell

import no.nav.helse.sprik.db.FeilmeldingRepository
import java.util.*
import kotlin.collections.ArrayList

class Sokemotor {
    private val feilmeldingRepository = FeilmeldingRepository()

    fun sok(s: String): List<Feilmelding> {
        val feilmeldinger = feilmeldingRepository.hentAlleFeilmeldinger()
        val resultat = ArrayList<Feilmelding>()

        for (i in feilmeldinger) {
            if (i.tittel.equals(s) or i.beskrivelse.equals(s)) {
                resultat.add(i)
            }
        }

        return resultat.toList()
    }
}