import FeilCard from "./FeilCard";

type FeilMelding = {
    tittel: String
    beskrivelse: String
}
/**
 * 
 * @returns Komponent for returnering av konteiner med alle feilinnmeldingene. 
 */
const CardsContainer = () => {
    
    const feilMeldinger: FeilMelding[] = [
        {
            tittel: "Mangel på hensyn til tariffoppgjør",
            beskrivelse: "Det har vært ett tariffoppgjør og speil sier sykepengene må tilbakekreves, noe som er feil. (sier vi.. har ikke domenekunnskap)"
        },
        {
            tittel: "Speil sier NAV må tilbakekreve sykepenger på feil grunnlag",
            beskrivelse: "baluba"
        },
        {
            tittel: "Feil A",
            beskrivelse: "Lorem Ipsum"
        },
        {
            tittel: "Feil B",
            beskrivelse: "dolor"
        },
        {
            tittel: "Håndkle på hue",
            beskrivelse: "Bombastic side eye"
        }
    ]

    return(
        <div>
            <div className="grid grid-cols-2 gap-4">
                {feilMeldinger.map((feilMelding) => (
                    <FeilCard tittel={feilMelding.tittel} beskrivelse={feilMelding.beskrivelse}/> 
                ))}
            </div>     
        </div>

    )
}
export default CardsContainer