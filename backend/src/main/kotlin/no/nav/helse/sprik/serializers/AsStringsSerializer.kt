package no.nav.helse.sprik.serializers
import java.util.Date
import kotlinx.serialization.KSerializer
import kotlinx.serialization.SerializationException
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder

abstract class AsStringSerializer<T : Any>(
        serialName: String,
        private val parse: (String) -> T
) : KSerializer<T>{

override val descriptor: SerialDescriptor =
        PrimitiveSerialDescriptor(serialName, PrimitiveKind.STRING)

override fun serialize(encoder: Encoder, value: T) {
    value.toString().let(encoder::encodeString)
}

override fun deserialize(decoder: Decoder): T =
        decoder.decodeString()
                .runCatching(parse)
                .getOrElse { throw SerializationException(it) }
}
