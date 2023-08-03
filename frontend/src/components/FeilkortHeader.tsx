import { Heading } from "@navikt/ds-react";
import { IFeilmelding } from "../interface";
import TagBar from "./TagBar";

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
            <p>{props.kommentar}</p>             
        </div>
    )
}
export default FeilkortHeader;