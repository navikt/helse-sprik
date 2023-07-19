import FeilCard from "./FeilCard"
/**
 * 
 * @returns Komponent for returnering av konteiner med alle feilinnmeldingene. 
 */
const CardsContainer = () => {
    
    const feilMeldinger: Feilmelding[] = [
        {
            tittel: "Mangel på hensyn til tariffoppgjør",
            beskrivelse: "Det har vært ett tariffoppgjør og speil sier sykepengene må tilbakekreves, noe som er feil. (sier vi.. har ikke domenekunnskap)",
            haster: false
        },
        {
            tittel: "Speil sier NAV må tilbakekreve sykepenger på feil grunnlag",
            beskrivelse: "baluba",
            haster: true
        },
        {
            tittel: "Feil A",
            beskrivelse: "Lorem Ipsum",
            haster: false
        },
        {
            tittel: "Feil B",
            beskrivelse: "dolor",
            haster: false
        },
        {
            tittel: "Håndkle på hue",
            beskrivelse: "Bombastic side eye",
            haster: true
        }
    ]

    return(
        <div>
            <div className="grid grid-cols-2 gap-4">
                {feilMeldinger.map((feilMelding) => (
                    <FeilCard 
                        key={feilMeldinger.indexOf(feilMelding)} 
                        tittel={feilMelding.tittel} 
                        beskrivelse={feilMelding.beskrivelse} 
                        haster={feilMelding.haster}
                    /> 
                ))}
            </div>     
        </div>

    )
}
export default CardsContainer