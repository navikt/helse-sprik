import { Accordion } from "@navikt/ds-react"


const Filtermeny = () => {
    return (
        <div className="bg-bg-default w-500">
            <Accordion>
                <Accordion.Item>
                    <Accordion.Header>
                        Kategori
                    </Accordion.Header>
                    <Accordion.Content>
                        Hvis du er mellom 62 og 67 år når du søker, må du som hovedregel ha
                        hatt en pensjonsgivende inntekt som tilsvarer x G, året før du fikk
                        nedsatt arbeidsevnen. NAV kan gjøre <a href="#Unntak">unntak</a>.
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item defaultOpen>
                    <Accordion.Header>
                        Status
                    </Accordion.Header>
                    <Accordion.Content>
                        Da er det lite som trengs å gjøres.
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        Prioritet
                    </Accordion.Header>
                    <Accordion.Content>
                        Da er det lite som trengs å gjøres.
                    </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item>
                    <Accordion.Header>
                        Mine innmeldinger
                    </Accordion.Header>
                    <Accordion.Content>
                        Da er det lite som trengs å gjøres.
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}
export default Filtermeny