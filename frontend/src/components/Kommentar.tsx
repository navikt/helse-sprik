import { ChatElipsisIcon } from "@navikt/aksel-icons"
import { TextField, Button, Heading } from "@navikt/ds-react"
import Skillelinje from "./Skillelinje"

interface kommentarTekstfeltInterface {
    kommentarfelt: string,
    setKommentarfelt: (val: string) => void
    oppdaterKommentar: () => void
}
interface kommentarInterface {
    tekst: string
}

/**
 * Kommentartekstfeltet er et tekstfelt med en knapp som poster en kommentar til en feil.
 */
export const KommentarTekstfelt = (props: kommentarTekstfeltInterface) => {
    return(
        <div className="flex items-end gap-12 w-full mt-4 h-fit">
            <TextField
                className="grow"
                label="Skriv inn din kommentar til feilen"
                value={props.kommentarfelt}
                onChange={e => props.setKommentarfelt(e.target.value)}
            >
            </TextField>
            <Button
                variant="secondary"
                icon={<ChatElipsisIcon/>}
                onClick={() => props.oppdaterKommentar()}
            >
                Legg til kommentar
            </Button>
        </div>
    )
}

/**
 * Kommentar er en komponent som viser en kommentar til en feil.
 * Komentaren kan beskrive konklusjonen til en feil, eller være en oppdatering på statusen til en feil.
 * @param tekst
 */
export const Kommentar = (props: kommentarInterface) => {
    return(
        <>
            <Skillelinje/>
            <div className="p-5 bg-bg-subtle rounded-lg w-2/3 my-4">
                <Heading size="medium">Kommentar</Heading>
                <p className="break-words">{props.tekst}</p>
            </div> 
        </>
    )
}