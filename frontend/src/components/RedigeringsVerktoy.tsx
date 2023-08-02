import { FloppydiskIcon, XMarkIcon } from "@navikt/aksel-icons"
import { TextField, Textarea, RadioGroup, Radio, Button, Switch } from "@navikt/ds-react"
import { useState } from "react"
import { FeilmeldingsInnholdInterface } from "../interface"
import axios from "axios"
import Skillelinje from "./Skillelinje"

interface redigeringsInterface extends FeilmeldingsInnholdInterface {
    reset: () => void
}

const RedigeringsVerktoy = (props: redigeringsInterface) => {
    const [tittel, setTittel] = useState(props.tittel)
    const [beskrivelse, setBeskrivelse] = useState(props.beskrivelse)
    const [arbeidsstatus, setArbeidsstatus] = useState(props.arbeidsstatus)
    const [haster, setHaster] = useState(props.haster)
    const [kommentar, setKommentar] = useState(props.kommentar)

    const lagreEndringer = async() => {
        props.setVisModal(false)
        props.setRedigeringsmodus(false)

        const payload = {
            id: props.id,
            tittel: tittel,
            beskrivelse: beskrivelse,
            dato: props.dato.toISOString().replace('Z', ''),
            arbeidsstatus: arbeidsstatus,
            haster: haster,
            kommentar: (kommentar ? kommentar : null)
        }

        await axios.put(`/api/oppdaterfeil/`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        })

        props.reset()
    }

    return (
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
                <Skillelinje/>
                <RadioGroup
                    legend="Velg arbeidsstatus for feil"
                    onChange={(arbeidsstatus: number) => {setArbeidsstatus(arbeidsstatus)}}
                    value={arbeidsstatus}
                >
                    <Radio value={0}>Ikke påbegynt</Radio>
                    <Radio value={1}>Feilen jobbes med</Radio>
                    <Radio value={2}>Feilen er fikset</Radio>
                </RadioGroup>
                <Skillelinje/>
                <Switch checked={haster} onClick={() => setHaster(!haster)}>
                    Saken haster
                </Switch>
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
                        props.setRedigeringsmodus(false)
                    }}
                >
                    Avbryt
                </Button>
            </div>
        </div>
    )
}
export default RedigeringsVerktoy;
