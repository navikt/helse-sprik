package no.nav.helse.sprik.modell

import no.nav.helse.sprik.db.FeilmeldingRepository
import java.util.*
import kotlin.collections.ArrayList

class Sokemotor {
    private val feilmeldingRepository = FeilmeldingRepository()

    fun sok(s: String): List<Feilmelding> {

        val feilmeldinger = feilmeldingRepository.hentAlleFeilmeldinger()
        val resultat = ArrayList<Feilmelding>()

        val processed = s.lowercase()

        for (i in feilmeldinger) {
            if (i.tittel.lowercase().contains(processed) or i.beskrivelse.lowercase().contains(processed) or processed.equals("")) {
                println(i.toString() + " matcher" + processed)
                resultat.add(i)
            }else{
                println(i.toString() + " matcher ikke")
            }
        }

        return resultat.toList()
    }
}