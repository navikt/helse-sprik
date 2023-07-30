import "@navikt/ds-css";
import { Button, Heading, Tag } from "@navikt/ds-react";
import { IFeilmelding } from "../interface";
import { createContext, useContext, useState } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";

/**
 * Kontekst som brukes for å vise og skjule FullvisningsKort-komponentet.
 * 
 * @param visHeleKortet en boolean som bestemmer om FullvisningsKort-komponentet skal vises eller ikke. 
 * True viser komponentet, false skjuler komponentet.
 * 
 * @param setVisHeleKortet en state-funksjon som endrer visHeleKortet. 
 * Gjør det mulig å endre visningsmodus fra andre komponenter en bare provider (Feilcard).
 */
const visningsContext = createContext({
    visHeleKortet: false,
    setVisHeleKortet: (value: boolean) => {}
})



/**
 * En konteiner som inneholder all informasjon og funksjonalitet for å vise og interagere med en feilmelding.
 * @param tittel
 * @param beskrivelse
 * @param dato
 * @returns JSX komponent som beskriver innholdet i feilmeldinger.
 */
export const FeilKort = (props: IFeilmelding) => {
    const [visHeleKortet, setVisHeleKortet] = useState(false)
    const visningsModus = {visHeleKortet, setVisHeleKortet}

    return(
        <visningsContext.Provider value={visningsModus}>
            <div className="
                bg-bg-default border border-border-default p-7 rounded-lg 
                hover:bg-bg-subtle hover:border-border-strong hover:shadow-md duration-100
                active:bg-surface-active
                "
                onClick={() => {
                    setVisHeleKortet(true)
                }}>
                <FeilkortHeader tittel={props.tittel} beskrivelse={props.beskrivelse} haster={false} dato={props.dato}/>
                <FullvisningsKort tittel={props.tittel} beskrivelse={props.beskrivelse} dato={props.dato}/>
            </div>
        </visningsContext.Provider>
    )
}



/**
 * Fullvisningskortet er en komponent som viser all informasjon om en feilmelding.
 * Alle brukere skal ikke ha tilgang til denne informasjonen, visningen av komponentet er derfor avhengig av en kontekst.
 * dersom visHeleKortet er true vises komponentet, ellers vises ikke komponentet og det returneres react fragmenter.
 * @param tittel
 * @param beskrivelse
 * @param dato
 * @returns JSX komponent som beskriver innholdet i feilmeldinger.
 */
const FullvisningsKort = (props: IFeilmelding) => {
    const {visHeleKortet, setVisHeleKortet} = useContext(visningsContext)
    return(
         visHeleKortet ? 
            <div className="h-screen w-screen absolute top-0 right-0 bg-grayalpha-800">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="bg-bg-default border border-border-default p-7 rounded-lg w-1/2">
                        <div className="flex justify-between gap-4">
                            <FeilkortHeader tittel={props.tittel} beskrivelse={props.beskrivelse} dato={props.dato}/>
                            <Button
                                icon={<XMarkIcon/>}
                                className="max-h-14 min-w-fit"
                                variant="secondary"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setVisHeleKortet(false)
                                }}
                            >
                                Lukk
                            </Button>                            
                        </div>
                        <div className="h-1 bg-bg-subtle w-full my-4"></div>
                    </div>                    
                </div>
            </div> 
        : <></>
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
const FeilkortHeader = (props: IFeilmelding) => {
    return(
        <div className="flex justify-between flex-col">
            <div>
                <Heading size="medium">{props.tittel}</Heading>
                <p className="text-text-subtle mb-4">{props.dato.toDateString()}</p>
                <p>{props.beskrivelse}</p>    
            </div>  
            <TagBar haster={false}/>              
        </div>
    )
}