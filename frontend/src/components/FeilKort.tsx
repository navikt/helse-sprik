import "@navikt/ds-css";
import { Modal} from "@navikt/ds-react";
import { IFeilmelding } from "../interface";
import FeilModal from "./FeilModal";
import { useEffect, useState } from "react";
import FeilkortHeader from "./FeilkortHeader";
import RedigeringsVerktoy from "./RedigeringsVerktoy";
import FeilmeldingsInnhold from "./FeilmeldingsInnhold";

interface IFeilKort extends IFeilmelding {
    reset: () => void
}

/**
 * En konteiner som inneholder all informasjon og funksjonalitet for å vise og interagere med en feilmelding.
 * Komponentet rendres på hovedsiden, og mappes ut fra en liste med feilmeldinger i KortKonteiner.
 * Du kan trykke på en feilmelding for å åpne en modal som viser mer informasjon om feilmeldingen, samt mulighet for å redigere.
 * @param id er feilmeldingens unike id
 * @param tittel 
 * @param beskrivelse 
 * @param dato Dato for når feilen ble meldt inn
 * @param haster Boolean som beskriver om feilen haster eller ikke.
 * @param reset funksjon som kalles når en feilmelding endres. Denne funksjonen kalles for å oppdatere feilmeldingene som vises på hovedsiden.
 */
const FeilKort = (props: IFeilKort) => {
    const [visModal, setVisModal] = useState<boolean>(false)
    const [redigeringsmodus, setRedigeringsmodus] = useState(false)
    
    useEffect(() => {
        Modal.setAppElement(document.getElementById('root'));
    }, []);
    
    return(
        <>
            <div 
                key={props.id}
                className="
                bg-bg-default border border-border-default p-7 rounded-lg 
                hover:bg-bg-subtle hover:border-border-strong hover:shadow-md duration-100
                active:bg-surface-active"
                onClick={() => setVisModal(true)}
                >
                <FeilkortHeader 
                    id={props.id}
                    tittel={props.tittel}
                    beskrivelse={props.beskrivelse}
                    dato={props.dato}
                    haster={props.haster}
                    arbeidsstatus={props.arbeidsstatus}
                    kommentar={props.kommentar}
                    />
            </div>
            <FeilModal open={visModal} setOpen={setVisModal}>
                {redigeringsmodus ? 
                    <RedigeringsVerktoy 
                    id={props.id}
                    tittel={props.tittel}
                    beskrivelse={props.beskrivelse}
                    dato={props.dato}
                    haster={props.haster}
                    arbeidsstatus={props.arbeidsstatus}
                    setRedigeringsmodus={setRedigeringsmodus}
                    setVisModal={setVisModal}
                    reset={props.reset}
                    kommentar={props.kommentar}
                    aktorId={props.aktorId}
                    />
                    : 
                    <FeilmeldingsInnhold
                    id={props.id}
                    tittel={props.tittel}
                    beskrivelse={props.beskrivelse}
                    dato={props.dato}
                    haster={props.haster}
                    arbeidsstatus={props.arbeidsstatus}
                    setVisModal={setVisModal}
                    setRedigeringsmodus={setRedigeringsmodus}
                    reset={props.reset}
                    kommentar={props.kommentar}
                    aktorId={props.aktorId}
                    >
                        <p>aktorId: {props.aktorId}</p>
                    </FeilmeldingsInnhold>
                }              
            </FeilModal>
        </>
    )
}
export default FeilKort
