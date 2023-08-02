import "@navikt/ds-css";
import { Button, Modal, Radio, RadioGroup, TextField, Textarea } from "@navikt/ds-react";
import { Feilmelding, IFeilmelding } from "../interface";
import FeilModal from "./FeilModal";
import { useEffect, useState } from "react";
import { FloppydiskIcon, PencilIcon, XMarkIcon } from "@navikt/aksel-icons";
import axios from "axios";
import FeilkortHeader from "./FeilkortHeader";

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
    const [tittel, setTittel] = useState(props.tittel)
    const [beskrivelse, setBeskrivelse] = useState(props.beskrivelse)
    const [arbeidsstatus, setArbeidsstatus] = useState(props.arbeidsstatus)
    const [haster, setHaster] = useState(props.haster)


    useEffect(() => {
        Modal.setAppElement(document.getElementById('root'));
    }, []);

    const lagreEndringer = () => {
        setRedigeringsmodus(false)

        const fields = {
            id: props.id,
            tittel: tittel,
            beskrivelse: beskrivelse,
            dato: props.dato,
            arbeidsstatus: arbeidsstatus,
            haster: haster
        }

        const endretFeilmelding = new Feilmelding(fields)

        axios.put(`/api/oppdaterfeil/${props.id}`, endretFeilmelding, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })
    }
    
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

                    <div className="flex justify-between">
                        <div className="flex flex-col gap-4 w-1/2">
                            <TextField 
                                label="Tittel"
                                value={tittel}
                                onChange={e => setTittel(e.target.value)}
                            />
                            <Textarea 
                                label="Beskrivelse"
                                value={beskrivelse}
                                onChange={e => setBeskrivelse(e.target.value)}
                            />
                            <RadioGroup
                                legend="Velg arbeidsstatus for feil"
                                onChange={(arbeidsstatus: number) => {setArbeidsstatus(arbeidsstatus)}}
                                value={arbeidsstatus}
                            >
                                <Radio value={0}>Ikke påbegynt</Radio>
                                <Radio value={1}>Feilen jobbes med</Radio>
                                <Radio value={2}>Feilen er fikset</Radio>
                            </RadioGroup>
                            <RadioGroup
                                legend="Hvor vil du sitte?"
                                onChange={(haster: boolean) => {setHaster(haster)}}
                                value={haster}
                            >
                                <Radio value={true}>Ja</Radio>
                                <Radio value={false}>Nei</Radio>
                            </RadioGroup>
                        </div>
                        <div className="flex gap-4 items-start">
                            <Button
                                variant="primary"
                                icon={<FloppydiskIcon/>}
                                onClick={() => lagreEndringer()}
                            >
                                Lagre
                            </Button>
                            <Button
                                variant="danger"
                                icon={<XMarkIcon/>}
                                onClick={() => {
                                    setRedigeringsmodus(false)
                                }}
                            >
                                Avbryt
                            </Button>
                        </div>
                    </div>

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