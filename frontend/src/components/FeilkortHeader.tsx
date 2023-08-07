import { Heading } from "@navikt/ds-react";
import { IFeilmelding } from "../interface";
import TagBar from "./TagBar";

/**
 * Headeren til et Feilkort, inneholder lite sensitiv informasjon som er beskrivende for feilen (tittel, beskrivelse, dato, haster, arbeidsstatus).
 * Komponentet er en del av FeilKort, og er det du kan se når du er på hovedsiden.
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
export default FeilkortHeader;