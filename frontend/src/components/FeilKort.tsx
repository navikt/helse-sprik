import "@navikt/ds-css";
import { Button, Modal, Radio, RadioGroup, TextField, Textarea } from "@navikt/ds-react";
import { IFeilmelding } from "../interface";
import FeilModal from "./FeilModal";
import { useEffect, useState } from "react";
import { FloppydiskIcon, PencilIcon, XMarkIcon } from "@navikt/aksel-icons";
import axios from "axios";
import FeilkortHeader from "./FeilkortHeader";
import RedigeringsVerktoy from "./RedigeringsVerktoy";

/**
 * En konteiner som inneholder all informasjon og funksjonalitet for å vise og interagere med en feilmelding.
 * @param tittel
 * @param beskrivelse
 * @param dato
 * @returns JSX komponent som beskriver innholdet i feilmeldinger.
 */
interface IFeilKort extends IFeilmelding {
    key: number
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
                />
            </div>
            <FeilModal open={visModal} setOpen={setVisModal} >
                {redigeringsmodus ? 
                    <RedigeringsVerktoy 
                        id={props.id}
                        tittel={props.tittel}
                        beskrivelse={props.beskrivelse}
                        dato={props.dato}
                        haster={props.haster}
                        arbeidsstatus={props.arbeidsstatus}
                        setRedigeringsmodus={setRedigeringsmodus}
                    />
                : 
                <div>
                    <div className="flex justify-between">
                        <FeilkortHeader 
                            id={props.id}
                            tittel={props.tittel}
                            beskrivelse={props.beskrivelse}
                            dato={props.dato}
                            haster={props.haster}
                            arbeidsstatus={props.arbeidsstatus}
                        />
                        <div className="flex gap-4 items-start">
                            <Button
                                variant="secondary"
                                icon={<PencilIcon/>}
                                onClick={() => setRedigeringsmodus(true)}
                            >
                                Rediger
                            </Button>
                            <Button
                                icon={<XMarkIcon/>}
                                onClick={() => {
                                    setVisModal(false)
                                    setRedigeringsmodus(false)
                                }}
                            >
                                Lukk
                            </Button>
                        </div>
                    </div>
                    <div className="h-2 bg-gray-200 my-4 rounded-lg"></div>
                    {/* TODO: HER KOMMER CONTENT */}
                </div>
                }              
            </FeilModal>
        </>
    )
}
export default FeilKort