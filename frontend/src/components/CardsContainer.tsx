import FeilCard from "./FeilCard"
import useSWR from "swr"
/**
 * 
 * @returns Komponent for returnering av konteiner med alle feilinnmeldingene. 
 */
const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())


const fetchFeil = () => {    
    const {data, error, isLoading } = useSWR("/api/hentFeil", fetcher)
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loader</div>
    return <div>hello {data.name}!</div>
}

const CardsContainer = () => {
    
    const feilMeldinger: Feilmelding[] = [
        {
            tittel: "Mangel på hensyn til tariffoppgjør",
            beskrivelse: "Det har vært ett tariffoppgjør og speil sier sykepengene må tilbakekreves, noe som er feil. (sier vi.. har ikke domenekunnskap)",
            haster: false,
            dato: new Date()
        },
        {
            tittel: "Speil sier NAV må tilbakekreve sykepenger på feil grunnlag",
            beskrivelse: "baluba",
            haster: true,
            dato: new Date()
        },
        {
            tittel: "Feil A",
            beskrivelse: "Lorem Ipsum",
            haster: false,
            dato: new Date()
        },
        {
            tittel: "Feil B",
            beskrivelse: "dolor",
            haster: false,
            dato: new Date()
        },
        {
            tittel: "Håndkle på hue",
            beskrivelse: "Bombastic side eye",
            haster: true,
            dato: new Date()
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
                        dato={new Date()}                    /> 
                ))}
            </div> 
            <div>
                <br/>
                <p>Forsøker å loade feil objekter her:</p>
                {fetchFeil()}
            </div>    
        </div>

    )
}
export default CardsContainer