/*
 * I denne filen kan vi legge interfaces som skal brukes over flere steder!
 */


export interface IFeilmelding {
    id: number,
    tittel: string,
    beskrivelse: string
    dato: Date
    haster: boolean
    arbeidsstatus: number
}

export interface FeilmeldingsInnholdInterface extends IFeilmelding {
    children?: React.ReactNode
    setRedigeringsmodus: (redigeringsmodus: boolean) => void
    setVisModal: (visModal: boolean) => void
    reset: () => void
}

export class Feilmelding implements IFeilmelding {
    id: number = 0
    tittel: string = "default tittel"
    beskrivelse: string = "default beskrivelse"
    dato: Date = new Date()
    haster: boolean = false
    arbeidsstatus: number = 0

    /**
     * Typescript 2.1 syntax som lar deg sende inn et JSON object og mappe det til class.
     * https://stackoverflow.com/questions/14142071/typescript-and-field-initializers
     */
    public constructor(
        fields: {
            id: number
            tittel: string
            beskrivelse: string
            dato: Date
            haster: boolean
            arbeidsstatus: number
        }) {
        if (fields) Object.assign(this, fields);    
    }
}