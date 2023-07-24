import { data } from "autoprefixer";
import FeilCard from "./FeilCard"
import useSWR from "swr"
import { backendURL } from "../const.ts"
import { Feilmelding, IFeilmelding } from "../interface.ts";
/**
 * 
 * @returns Komponent for returnering av konteiner med alle feilinnmeldingene. 
 */
// const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())


async function fetchAlleFeil() {    
    // const {data, error, isLoading } = useSWR("/api/hentallefeil", fetcher)
    // if (error) return <div>fail</div>
    // if (isLoading) return <div>loader</div>
    // return <div>hello {data.data}!</div>
    try {
        const response = await fetch(backendURL + "/api/hentallefeil", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((data) => data.json())
        .then((feil) => {
            return feil.map(jsonFeilmelding => new Feilmelding(jsonFeilmelding))                          
        })
        .catch((error) => {
            console.log(error)
        })
        return response
    } catch (error) {
        console.log("error:", error);
    }
}



const printFeil = async () => {
    const a = await fetchAlleFeil(); 
    console.log("a:", a);    
};

const CardsContainer = () => {
    
    const feilMeldinger: Feilmelding[] = []
    printFeil()
    
    return(
        <div>
            <div className="grid grid-cols-2 gap-4">
                {feilMeldinger.map((feilMelding) => (
                    <FeilCard 
                        key={feilMeldinger.indexOf(feilMelding)}
                        tittel={feilMelding.tittel}
                        beskrivelse={feilMelding.beskrivelse}
                        // haster={feilMelding.haster} 
                        dato={new Date()}                    /> 
                ))}
            </div> 
            <div>
                <br/>
                <p>Forsøker å loade feil objekter her:</p>
            </div>    
        </div>

    )
}
export default CardsContainer