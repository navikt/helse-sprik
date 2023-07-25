import FeilCard from "./FeilCard";
import { backendURL } from "../const.ts";
import { Feilmelding } from "../interface.ts";
import { useEffect, useState } from "react";

const CardsContainer = () => {
  const [test, setTest] = useState([]);
  const feilMeldinger: Feilmelding[] = test;

  async function fetchAlleFeil() {
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

  useEffect(() => {fetchAlleFeil()})

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
    </div>
  );

};

export default CardsContainer;
