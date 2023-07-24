import FeilCard from "./FeilCard";
import { backendURL } from "../const.ts";
import { Feilmelding } from "../interface.ts";
import { useState } from "react";
/**
 *
 * @returns Komponent for returnering av konteiner med alle feilinnmeldingene.
 */
// const fetcher = (url: RequestInfo | URL) => fetch(url).then(r => r.json())

// const test = async () => {
//     const response = await fetch(backendURL + "/api/hentallefeil")
//     const data = await response.json() // data er Promise
//     return data.then({

//     })
// }

const CardsContainer = () => {
  const [test, setTest] = useState([]);

  async function fetchAlleFeil() {
    // const {data, error, isLoading } = useSWR("/api/hentallefeil", fetcher)
    // if (error) return <div>fail</div>
    // if (isLoading) return <div>loader</div>
    // return <div>hello {data.data}!</div>

    const response = await fetch(backendURL + "/api/hentallefeil", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((feil) => {
        setTest(
          feil.map((jsonFeilmelding: any) => new Feilmelding(jsonFeilmelding))
        );
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }

//   fetchAlleFeil();

  const feilMeldinger: Feilmelding[] = test;

  // console.log(test())

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {feilMeldinger.map((feilMelding) => (
          <FeilCard
            key={feilMeldinger.indexOf(feilMelding)}
            tittel={feilMelding.tittel}
            beskrivelse={feilMelding.beskrivelse}
            // haster={feilMelding.haster}
            dato={new Date()}
          />
        ))}
      </div>
      <div>
        <br />
        <p>Forsøker å loade feil objekter her:</p>
      </div>
    </div>
  );
};
export default CardsContainer;
