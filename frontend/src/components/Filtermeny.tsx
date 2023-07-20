import { Accordion, Checkbox, CheckboxGroup, Radio, RadioGroup } from "@navikt/ds-react"
import { useState } from "react"

const Filtermeny = () => {
    return (
        <div className="bg-bg-default w-500">
            <Accordion>
                <KategoriFilter/>
                <StatusFilter/>
                <PrioritetFilter/>
                <MineInnmeldinger/>
            </Accordion>
        </div>
    )
}
export default Filtermeny


const KategoriFilter = () => {
    return (
        <Accordion.Item>
            <Accordion.Header>
                Kategori
            </Accordion.Header>
            <Accordion.Content>
                <p>
                    Denne løsningen er litt mer avansert enn den andre filtreringen. UFERDIG!!!!!!!!!!!
                </p>
            </Accordion.Content>
        </Accordion.Item>
    )
}


const StatusFilter = () => {
    return(
        <Accordion.Item>
            <Accordion.Header>
                Status
            </Accordion.Header>
            <Accordion.Content>
                <p>
                    Ved å filtrere etter status på forskjellig innmeldte feil
                    kan du enkelt få oversikt over hvilke feil som ikke er påbegynte,
                    hvilke som utredes av utviklingsteamet og løste feil.
                </p>
                <br/>
                <CheckboxGroup
                    legend="Hvilke statusflagg ønsker du å vise?"
                >
                    <Checkbox value="Ikke påbegynt">Velg alle</Checkbox>
                    <Checkbox value="Ikke påbegynt">Ikke påbegynt</Checkbox>
                    <Checkbox value="Jobbes med">Jobbes med</Checkbox>
                    <Checkbox value="Ferdig med">Ferdig med</Checkbox>
                </CheckboxGroup>
            </Accordion.Content>
        </Accordion.Item>
    )
}


const PrioritetFilter = () => {
    const [verdi, settVerdi] = useState(false)
    
    return(
        <Accordion.Item>
            <Accordion.Header>
                Prioritet
            </Accordion.Header>
            <Accordion.Content>
                <p>
                    Saker som haster å løse kan merkes med et haster flagg.
                    For å raskt finne ut av hvilke saker som må løses raskt, 
                    kan man velge å kun vise hastesaker.
                </p>
                <br/>
                <RadioGroup
                    legend="Velg visningstype"
                    value={verdi}
                    onChange={(nyVerdi: any) => settVerdi(nyVerdi)}
                >
                    <Radio value={false}>Alle feil</Radio>
                    <Radio value={true}>Kun feil som haster</Radio>
                </RadioGroup>
            </Accordion.Content>
        </Accordion.Item>
    )
}

const MineInnmeldinger = () => {
    const [verdi, settVerdi] = useState(false)

    return(
        <Accordion.Item>
            <Accordion.Header>
                Mine innmeldinger
            </Accordion.Header>
            <Accordion.Content>
                <p>
                    Som saksbehandler kan det være nyttig å finne tilbake til feil man har meldt inn for å sjekke status eller konklusjon. 
                </p>
                <br/>
                <RadioGroup
                    legend="Velg visningstype"
                    value={verdi}
                    onChange={(nyVerdi: any) => settVerdi(nyVerdi)}
                >
                    <Radio value={false}>Alle feil</Radio>
                    <Radio value={true}>Kun egne feil</Radio>
                </RadioGroup>
            </Accordion.Content>
        </Accordion.Item>
    )
}