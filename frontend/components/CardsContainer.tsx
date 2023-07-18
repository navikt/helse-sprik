import axios from "axios";
import FeilCard from "./FeilCard";
import useSWR from "swr";

type FeilMelding = {
    tittel: String
    beskrivelse: String
}

function hentFeilmeldinger() {
    const fetcher = (url: any) => axios.get(url).then(res => res.data)
    const {data, error, isLoading} = useSWR('http://0.0.0.0:8080/hentFeil', fetcher);
    if (error) return <div>failed to load: {error.message}</div>
    if (isLoading) return <div>Loading...</div>
    return data
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
                    <FeilCard key={feilMelding.toString()} tittel={feilMelding.tittel} beskrivelse={feilMelding.beskrivelse}/> 
                ))}
            </div>
            <p>
                Her testes fetching:
            </p> 
            <div>
                {hentFeilmeldinger()}
            </div>    
        </div>

    )
}
export default CardsContainer