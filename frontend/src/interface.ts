export interface IFeilmelding {
    id: number,
    tittel: string,
    beskrivelse: string
    dato: Date
    arbeidsstatus: number
    haster: boolean
    kommentar?: string
    aktorId?: number
}

export interface FeilmeldingsInnholdInterface extends IFeilmelding {
    children?: React.ReactNode
    setRedigeringsmodus: (redigeringsmodus: boolean) => void
    setVisModal: (visModal: boolean) => void
    reset: () => void
}

/**
 * En klasse som implementerer IFeilmelding interfacet. 
 * Brukes for å mappe JSON objekter til en klasse ved henting av data fra backend
 */
export class Feilmelding implements IFeilmelding {
    id: number = 0
    tittel: string = "default tittel"
    beskrivelse: string = "default beskrivelse"
    dato: Date = new Date()
    arbeidsstatus: number = 0
    haster: boolean = false
    kommentar?: string = undefined
    aktorid?: number = undefined

    public constructor(
        fields: {
            id: number
            tittel: string
            beskrivelse: string
            dato: Date
            arbeidsstatus: number
            haster: boolean
            kommentar: string
            aktorId: number
        }) {
        if (fields) Object.assign(this, fields);    
    }
}