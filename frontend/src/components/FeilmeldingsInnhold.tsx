import { PencilIcon, XMarkIcon } from "@navikt/aksel-icons"
import { Button } from "@navikt/ds-react"
import { FeilmeldingsInnholdInterface } from "../interface"
import FeilkortHeader from "./FeilkortHeader"
import Skillelinje from "./Skillelinje"

const FeilmeldingsInnhold = (props: FeilmeldingsInnholdInterface) => {
    return(
        <>
            <div className="flex justify-between ">
                <FeilkortHeader
                    id={props.id}
                    tittel={props.tittel}
                    beskrivelse={props.beskrivelse}
                    dato={props.dato}
                    haster={props.haster}
                    arbeidsstatus={props.arbeidsstatus} />
                <div className="flex gap-4 items-start">
                    <Button
                        variant="secondary"
                        icon={<PencilIcon />}
                        onClick={() => props.setRedigeringsmodus(true)}
                    >
                        Rediger
                    </Button>
                    <Button
                        icon={<XMarkIcon />}
                        onClick={() => {
                            props.setVisModal(false)
                            props.setRedigeringsmodus(false)
                        }}
                    >
                        Lukk
                    </Button>
                </div>
            </div>
            <Skillelinje/>
            {props.children}
        </>
    )
}
export default FeilmeldingsInnhold;
