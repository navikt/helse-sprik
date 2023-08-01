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
            <TagBar haster={props.haster}/>              
        </div>
    )
}


interface TagBarInterface {
    haster: boolean
}
/**
 * Komponentet er en bar (vanrett linje) som inneholder to statusflagg: "arbeidsstatus" og "Haster".
 * Komponentet er en del av FeilKortHeader
 * @param haster 
 */
const TagBar = (props: TagBarInterface) => {
    return (
        <div className="flex gap-8 mt-4">
            <Tag variant="info">Jobbes med</Tag>
            {props.haster === true ? <Tag variant="warning">Haster</Tag> : <></>}
        </div>
    )
}



