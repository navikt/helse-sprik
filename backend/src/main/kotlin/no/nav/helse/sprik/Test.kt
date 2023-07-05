package no.nav.helse.sprik

import kotlinx.serialization.*

@Serializable
data class Test (
    var ord: String,
    var tall: Int
) {
    override fun toString(): String {
        return "Test(ord='$ord', tall=$tall)"
    }
}