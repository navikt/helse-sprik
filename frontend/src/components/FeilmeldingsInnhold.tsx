import { PencilIcon, XMarkIcon } from "@navikt/aksel-icons"
import { Button } from "@navikt/ds-react"
import { FeilmeldingsInnholdInterface } from "../interface"
import FeilkortHeader from "./FeilkortHeader"
import { useState } from "react"
import Skillelinje from "./Skillelinje"
import axios from "axios"
import { Kommentar, KommentarTekstfelt } from "./Kommentar"


/**
 * FeilmeldingsInnhold er et komponent som viser det fulle innholdet til en feilmelding.
 * Komponentet er en del av FeilKort, og er det du kan se når du trykker på et Feilkort.
 * Tilgangen til å vise FeilmeldingsInnhold er skal begrenses til saksbehandlere, utviklere og fagfolk med tjenestlig behov.
 */
const FeilmeldingsInnhold = (props: FeilmeldingsInnholdInterface) => {
    //kommentar kan være null eller undefined når den kommer fra databasen, derfor må den sjekkes og omgjøres til en tom string om det er tilfellet
    const [kommentar, setKommentar] = useState(props.kommentar != (null || undefined)  ? props.kommentar : "") 
    const [kommentarfelt, setKommentarfelt] = useState("") 

    /**
     * Endrer Feilmeldingsobjektet i databasen og setter en ny kommentar på den
     */
    const oppdaterkommentar = async() => {
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
        //TODO: fiks så kommentar oppdateres uten å måtte skjule modalen. 
        props.setVisModal(false)
        props.reset()
    }

    const fullUpdate = async() => {
        setKommentar(kommentarfelt)
        oppdaterkommentar()
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
                    arbeidsstatus={props.arbeidsstatus} 
                    kommentar={props.kommentar}
                />
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
            
            <Kommentar 
                tekst={kommentar} 
                kommentarfelt={kommentarfelt} 
                setKommentarfelt={setKommentarfelt}
                oppdaterKommentar={fullUpdate}
            />

      </>
    )
}
export default FeilmeldingsInnhold;
