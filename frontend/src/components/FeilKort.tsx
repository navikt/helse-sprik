import "@navikt/ds-css";
import { Modal} from "@navikt/ds-react";
import { IFeilmelding } from "../interface";
import FeilModal from "./FeilModal";
import { useEffect, useState } from "react";
import FeilkortHeader from "./FeilkortHeader";
import RedigeringsVerktoy from "./RedigeringsVerktoy";
import FeilmeldingsInnhold from "./FeilmeldingsInnhold";

/**
 * En konteiner som inneholder all informasjon og funksjonalitet for å vise og interagere med en feilmelding.
 * @param tittel
 * @param beskrivelse
 * @param dato
 * @returns JSX komponent som beskriver innholdet i feilmeldinger.
 */
interface IFeilKort extends IFeilmelding {
    key: number
    reset: () => void
}

const FeilKort = (props: IFeilKort) => {
    const [visModal, setVisModal] = useState<boolean>(false)
    const [redigeringsmodus, setRedigeringsmodus] = useState(false)

    useEffect(() => {
        Modal.setAppElement(document.getElementById('root'));
    }, []);

    return(
        <>
            <div 
                key={props.key}
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
            <FeilModal 
                open={visModal} 
                setOpen={setVisModal} 
            >
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
                    >
                        <p>Her kommer det content</p>
                    </FeilmeldingsInnhold>
                }              
            </FeilModal>
        </>
    )
}
export default FeilKort