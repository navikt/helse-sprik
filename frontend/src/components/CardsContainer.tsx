import { FeilKort } from "./FeilCard";
import { Feilmelding } from "../interface.ts";

/**
 * Komponent som laster inn feilmeldinger i kort fra database.
 * @returns grid med feilmeldinger 
 */
const CardsContainer = (feilmeldinger: Feilmelding[]) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        {feilmeldinger.map((feilMelding) => (
          <FeilKort
            key={feilmeldinger.indexOf(feilMelding)}
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