import { Tag } from "@navikt/ds-react";

interface TagBarInterface {
    haster: boolean
    arbeidsstatus: number
}

/**
 * @param arbeidsstatus er en kode som beskriver om feilen er fikset, jobbes med eller ikke påbegynt. må være 0, 1 eller 2.
 * @returns Tag komponent med riktig farge og tekst basert på arbeidsstatus-kode
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
                
/**
 * Komponentet er en bar (vanrett linje) som inneholder to statusflagg: "arbeidsstatus" og "Haster".
 * Komponentet er en del av FeilKortHeader
 * @param haster er en boolean som beskriver om feilen haster eller ikke.
 * @param arbeidsstatus er en kode som beskriver om feilen er fikset, jobbes med eller ikke påbegynt. må være 0, 1 eller 2.
 */
const TagBar = (props: TagBarInterface) => {
    return (
        <div className="flex gap-3 mt-4">
            {toggleArbeidsstatus(props.arbeidsstatus)}
            {props.haster ? <Tag variant="warning">Haster</Tag> : <></>}
        </div>
    )
}
export default TagBar;