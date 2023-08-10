import { ChatElipsisIcon, PencilIcon } from "@navikt/aksel-icons"
import { TextField, Button, Heading } from "@navikt/ds-react"
import Skillelinje from "./Skillelinje"
import { useState } from "react"

interface kommentarInterface {
    kommentarfelt: string,
    setKommentarfelt: (val: string) => void
    oppdaterKommentar: () => void
    tekst: string
}

/**
 * Kommentartekstfeltet er et tekstfelt med en knapp som poster en kommentar til en feil.
 */
export const KommentarTekstfelt = (props: kommentarInterface) => {
    return (
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
                icon={<ChatElipsisIcon />}
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
    const [redigerKommentar, setRedigerKommentar] = useState(false)

    return (
        <>
            <Skillelinje />
            {props.tekst.length === 0 || redigerKommentar ?
                <KommentarTekstfelt
                    kommentarfelt={props.kommentarfelt}
                    setKommentarfelt={props.setKommentarfelt}
                    oppdaterKommentar={props.oppdaterKommentar}
                    tekst={props.tekst}
                />  
                :           
                <div className="flex flex-col gap-3 p-5 bg-bg-subtle rounded-lg w-2/3 my-4">
                    <div className="flex justify-between items-center">
                        <Heading size="medium">Kommentar</Heading>
                        <Button
                            variant="tertiary"
                            icon={<PencilIcon />}
                            onClick={() => {
                                setRedigerKommentar(true);
                                console.log(redigerKommentar);
                            }}
                        ></Button>
                    </div>
                    <p className="break-words">{props.tekst}</p>
                </div>
            }
        </>
    )
}