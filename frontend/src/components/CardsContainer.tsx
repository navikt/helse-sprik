import { FeilKort } from "./FeilCard";
import { Feilmelding } from "../interface.ts";

interface ICardsContainer {
  feilmeldinger: Feilmelding[]
}

/**
 * Komponent som laster inn feilmeldinger i kort fra database.
 * @returns grid med feilmeldinger 
 */
const CardsContainer = (props: ICardsContainer) => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-6">
        {props.feilmeldinger.map((feilMelding) => (
          <FeilKort
            key={props.feilmeldinger.indexOf(feilMelding)}
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