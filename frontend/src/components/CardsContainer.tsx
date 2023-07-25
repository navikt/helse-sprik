import FeilCard from "./FeilCard";
import { backendURL } from "../const.ts";
import { Feilmelding } from "../interface.ts";
import { useEffect, useState } from "react";

/**
 * Komponent som laster inn feilmeldinger i kort fra database.
 * @returns grid med feilmeldinger 
 */
const CardsContainer = () => {
  // Array med feilmeldinger
  const [feilMeldinger, setFeilmeldinger] = useState<Feilmelding[]>([]);

  /**
   * Fetcher feilmeldinger fra backend.
   * Bruker endepunktet /api/hentallefeil.
   * @returns response
   */
  async function fetchAlleFeil() {
    const response = await fetch(backendURL + "/api/hentallefeil", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => data.json())
      .then((feil) => {
        setFeilmeldinger(
          feil.map((jsonFeilmelding: any) => new Feilmelding(jsonFeilmelding))
        );
      })
      .catch((error) => {
        console.log(error);
      });
    return response;
  }

  // Sørger for at fetchAlleFeil() kun kjører når komponentet laster inn
  useEffect(() => {
    fetchAlleFeil()
  }, [])

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {feilMeldinger.map((feilMelding) => (
          <FeilCard
            key={feilMeldinger.indexOf(feilMelding)}
            tittel={feilMelding.tittel}
            beskrivelse={feilMelding.beskrivelse}
            dato={new Date()}
          />
        ))}
      </div>
    </div>
  );
};

export default CardsContainer;