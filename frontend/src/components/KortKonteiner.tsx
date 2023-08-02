import FeilKort from "./FeilKort.tsx";
import { Feilmelding } from "../interface.ts";

interface IKortKonteiner {
  feilmeldinger: Feilmelding[]
  reset: () => void
}

/**
 * Komponent som laster inn feilmeldinger i kort fra database.
 * @returns grid med feilmeldinger 
 */
const KortKonteiner = (props: IKortKonteiner) => {  
  return (
      <div className="grid grid-cols-2 gap-6">
        
        {props.feilmeldinger.map((feilMelding) => (
            <FeilKort
              key={props.feilmeldinger.indexOf(feilMelding)}
              id={feilMelding.id}
              tittel={feilMelding.tittel}
              beskrivelse={feilMelding.beskrivelse}
              dato={new Date()}
              haster={feilMelding.haster}
              arbeidsstatus={feilMelding.arbeidsstatus}
              reset={props.reset}
            />         
            ))
          }
      </div>
  );
};

export default KortKonteiner;