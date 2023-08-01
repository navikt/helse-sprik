import "@navikt/ds-css";
import { Heading, Modal, Tag } from "@navikt/ds-react";
import { IFeilmelding } from "../interface";
import FeilModal from "./FeilModal";
import { useEffect, useState } from "react";

/**
 * En konteiner som inneholder all informasjon og funksjonalitet for å vise og interagere med en feilmelding.
 * @param tittel
 * @param beskrivelse
 * @param dato
 * @returns JSX komponent som beskriver innholdet i feilmeldinger.
 */
interface IFeilKort extends IFeilmelding {
    key: number
}
export const FeilKort = (props: IFeilKort) => {
    const [visModal, setVisModal] = useState<boolean>(false)

    useEffect(() => {
        Modal.setAppElement(document.getElementById('root'));
    }, []);
    
    return(
        <>
            <div 
                key={props.key}
                className="
                bg-bg-default border border-border-default p-7 rounded-lg 
                hover:bg-bg-subtle hover:border-border-strong hover:shadow-md duration-100
                active:bg-surface-active"
                onClick={() => setVisModal(true)}
            >
                <FeilkortHeader 
                    tittel={props.tittel}
                    beskrivelse={props.beskrivelse}
                    dato={props.dato}
                    haster={props.haster}
                    arbeidsstatus={props.arbeidsstatus}
                />
            </div>
            <FeilModal open={visModal} setOpen={setVisModal} >
                <FeilkortHeader 
                    tittel={props.tittel}
                    beskrivelse={props.beskrivelse}
                    dato={props.dato}
                    haster={props.haster}
                    arbeidsstatus={props.arbeidsstatus}
                />
                <div className="h-2 bg-gray-200 my-4 rounded-lg"></div>
                {/* TODO: HER KOMMER CONTENT */}
            </FeilModal>
        </>
    )
}

/**
 * FeilkortHeader er komponent som beskriver ikke-sensitiv informasjon om feilmeldingen og vises for alle på forsiden.
 * FeilkortHeaderen er en del av FeilKort-komponenten og FullvisningsKort-komponenten. 
 * Midlertidig implementerer komponentet @requires IFeilmelding for props, men dette må endres når IFeilmelding utvides i fremtiden for støtte av flere typer feilmeldinger.
 * @param tittel
 * @param beskrivelse
 * @param haster
 * @param dato
 * @returns JSX komponent som skal vise nødvendig informasjon for å forstå en feil.
 */
export const FeilkortHeader = (props: IFeilmelding) => {
    return(
        <div className="flex justify-between flex-col">
            <div>
                <Heading size="medium">{props.tittel}</Heading>
                <p className="text-text-subtle mb-4">{props.dato.toDateString()}</p>
                <p>{props.beskrivelse}</p>    
            </div>  
            <TagBar haster={props.haster} arbeidsstatus={props.arbeidsstatus}/>              
        </div>
    )
}


interface TagBarInterface {
    haster: boolean
    arbeidsstatus: number
}
/**
 * Komponentet er en bar (vanrett linje) som inneholder to statusflagg: "arbeidsstatus" og "Haster".
 * Komponentet er en del av FeilKortHeader
 * @param haster er en boolean som beskriver om feilen haster eller ikke.
 * @param arbeidsstatus
 */
const TagBar = (props: TagBarInterface) => {

    /**
     * Funksjonen tar inn 
     * @param arbeidsstatus 
     * @returns 
     */
    const toggleArbeidsstatus = (arbeidsstatus: number) => {
        switch (arbeidsstatus) {
            case 0:
                return <Tag variant="neutral">Ikke påbegynt</Tag>;
            case 1:
                return <Tag variant="info">Feilen jobbes med</Tag>;
            case 2:
                return <Tag variant="success">Feilen er fikset</Tag>;
            default:
                throw new Error("Ikke gyldig arbeidsstatus-kode. Koden må være 0, 1 eller 2");
                
        }
    }

    return (
        <div className="flex gap-3 mt-4">
            {toggleArbeidsstatus(props.arbeidsstatus)}
            {props.haster ? <Tag variant="warning">Haster</Tag> : <></>}
        </div>
    )
}



