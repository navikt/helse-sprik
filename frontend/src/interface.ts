/*
 * I denne filen kan vi legge interfaces som skal brukes over flere steder!
 */


export interface IFeilmelding {
    tittel: string,
    beskrivelse: string
    // haster: boolean
    dato: Date
}

export class Feilmelding implements IFeilmelding {
    tittel: string = "default tittel"
    beskrivelse: string = "default beskrivelse"
    dato: Date = new Date()

    /**
     * Typescript 2.1 syntax som lar deg sende inn et JSON object og mappe det til class.
     * https://stackoverflow.com/questions/14142071/typescript-and-field-initializers
     */
    public constructor(
        fields: {
            tittel: string,
            beskrivelse: string,
            dato: Date
        }) {
        if (fields) Object.assign(this, fields);    
    }
}