package no.nav.helse.sprik

import java.time.LocalDateTime

fun Int.januar(år: Int = 2023, time: Int = 8, minutt: Int = 0) = LocalDateTime.of(år, 1,this, time, minutt)

val Int.januar get() = this.januar()