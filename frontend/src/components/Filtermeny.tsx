import { Accordion, Checkbox, CheckboxGroup, Radio, RadioGroup } from "@navikt/ds-react"
import React, { useState } from "react"

/**
 * Filtermenyen er en komponent som inneholder alle filterene som kan brukes for å filtrere feil.
 * Komponentet rendres på hovedsiden.
 * Foreløpig holder den filter for kategorier, status, prioritet og mine innmeldinger.
 */
const Filtermeny = () => {
    const [visningstype, settVisningstype] = useState(false)
    const [prioritet, settPrioritet] = useState(false)

    return (
        <div className="bg-bg-default w-500">
            <Accordion>
                <FilterModul 
                    tittel="Kategorier"
                    beskrivelse="Denne løsningen er litt mer avansert enn den andre filtreringen. UFERDIG!!!!!!!!!!"
                >

                </FilterModul>

                <FilterModul 
                    tittel="Status"
                    beskrivelse="                    
                        Ved å filtrere etter status på forskjellig innmeldte feil
                        kan du enkelt få oversikt over hvilke feil som ikke er påbegynte,
                        hvilke som utredes av utviklingsteamet og løste feil."
                >
                    <CheckboxGroup legend="Hvilke statusflagg ønsker du å vise?">
                        <Checkbox value="Ikke påbegynt">Velg alle</Checkbox>
                        <Checkbox value="Ikke påbegynt">Ikke påbegynt</Checkbox>
                        <Checkbox value="Jobbes med">Jobbes med</Checkbox>
                        <Checkbox value="Ferdig med">Ferdig med</Checkbox>
                    </CheckboxGroup>
                </FilterModul>

                <FilterModul 
                    tittel="Prioritet"
                    beskrivelse="
                        Saker som haster å løse kan merkes med et haster flagg.
                        For å raskt finne ut av hvilke saker som må løses raskt, 
                        kan man velge å kun vise hastesaker."
                >
                    <RadioGroup
                        legend="Velg visningstype"
                        value={prioritet}
                        onChange={(nyPrioritet: any) => settPrioritet(nyPrioritet)}
                    >
                        <Radio value={false}>Alle feil</Radio>
                        <Radio value={true}>Kun feil som haster</Radio>
                    </RadioGroup>
                </FilterModul>

                <FilterModul 
                    tittel="Mine innmeldinger"
                    beskrivelse="Som saksbehandler kan det være nyttig å finne tilbake til feil man har meldt inn for å sjekke status eller konklusjon."
                >
                    <RadioGroup
                        legend="Velg visningstype"
                        value={visningstype}
                        onChange={(nyVisningstype: any) => settVisningstype(nyVisningstype)}
                    >
                        <Radio value={false}>Alle feil</Radio>
                        <Radio value={true}>Kun egne feil</Radio>
                    </RadioGroup>
                </FilterModul>
            </Accordion>
        </div>
    )
}
export default Filtermeny


/**
 * Filtermodul utgjør en modul for de forskjellige filterene som kan brukes i Filtermenyen.
 * Komponentet bygger på aksel sin Accordion komponent og enkelt elementer i denne. 
 * Komponentet kan derfor ikke brukes utenfor en Accordion.
 * @param tittel Tittelen på filteret
 * @param beskrivelse Beskrivelse av hvordan kan brukes
 * @param children Innholdet i en Filtermodul, som er kontrollkomponenter for filteret
 * @returns 
*/
const FilterModul = (props: ItemInterface) => {
    return(
        <Accordion.Item>
            <Accordion.Header>
                {props.tittel}
            </Accordion.Header>
            <Accordion.Content>
                <p>{props.beskrivelse}</p>
                <br/>
                {props.children}
            </Accordion.Content>
        </Accordion.Item>
    )
}
interface ItemInterface {
    tittel: string
    beskrivelse: string
    children: React.ReactNode
}