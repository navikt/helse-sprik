import { ChatElipsisIcon, PencilIcon, XMarkIcon } from "@navikt/aksel-icons"
import { Button, Heading, TextField } from "@navikt/ds-react"
import { FeilmeldingsInnholdInterface } from "../interface"
import FeilkortHeader from "./FeilkortHeader"
import { useState } from "react"
import Skillelinje from "./Skillelinje"
import axios from "axios"

const FeilmeldingsInnhold = (props: FeilmeldingsInnholdInterface) => {
    const [kommentar, setKommentar] = useState(props.kommentar ? props.kommentar : "") 
    const [kommentarfelt, setKommentarfelt] = useState("") 

    const oppdaterkommentar = async() => {
        console.log(kommentarfelt)
        console.log(kommentar);
        

        const payload = {
            id: props.id,
            kommentar: kommentarfelt,
        }

        await axios.put("/api/oppdaterkommentar", payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })

        props.reset()
    }

    return(
        <>
            <div className="flex justify-between ">
                <FeilkortHeader
                    id={props.id}
                    tittel={props.tittel}
                    beskrivelse={props.beskrivelse}
                    dato={props.dato}
                    haster={props.haster}
                    arbeidsstatus={props.arbeidsstatus} />
                <div className="flex gap-4 items-start">
                    <Button
                        variant="tertiary"
                        icon={<PencilIcon />}
                        onClick={() => props.setRedigeringsmodus(true)}
                    >
                        Rediger
                    </Button>
                    <Button
                        icon={<XMarkIcon />}
                        onClick={() => {
                            props.setVisModal(false)
                            props.setRedigeringsmodus(false)
                        }}
                    >
                        Lukk
                    </Button>
                </div>
            </div>
            <Skillelinje/>
            {props.children}
            {kommentar.length === 0 ? 
                <KommentarTekstfelt
                    kommentarfelt={kommentarfelt} 
                    setKommentarfelt={setKommentarfelt}
                    oppdaterKommentar={() => {
                        setKommentar(kommentarfelt)
                        oppdaterkommentar()}
                    }
                /> 
                    : 
                <Kommentar 
                    tekst={kommentar}
                />
            }
      </>
    )
}
export default FeilmeldingsInnhold;


interface Ikommentar {
    setKommentarfelt: (val: string) => void
    oppdaterKommentar: () => void
}

interface kommentarTekstfeltInterface extends Ikommentar{
    kommentarfelt: string,
}
interface kommentarInterface {
    tekst: string
}


const KommentarTekstfelt = (props: kommentarTekstfeltInterface) => {
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

const Kommentar = (props: kommentarInterface) => {
    return(
        <>
            <Skillelinje/>
            <div className="p-5 bg-bg-subtle rounded-lg w-2/3 my-4">
                <Heading size="medium">Notat</Heading>
                <p className="break-words">{props.tekst}</p>
            </div> 
        </>
    )
}