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
              dato={new Date(feilMelding.dato)}
              arbeidsstatus={feilMelding.arbeidsstatus}
              haster={feilMelding.haster}
              reset={props.reset}
              kommentar={feilMelding.kommentar}
              aktorId={feilMelding.aktorid}
            />         
            ))
          }
      </div>
  );
};

export default KortKonteiner;