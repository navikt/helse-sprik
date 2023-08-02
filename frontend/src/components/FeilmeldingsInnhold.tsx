import { PencilIcon, XMarkIcon } from "@navikt/aksel-icons"
import { Button } from "@navikt/ds-react"
import { FeilmeldingsInnholdInterface } from "../interface"
import FeilkortHeader from "./FeilkortHeader"

const FeilmeldingsInnhold = (props: FeilmeldingsInnholdInterface) => {
    return(
        <div>
            <div className="flex justify-between">
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
                        } }
                    >
                        Lukk
                    </Button>
                </div>
            </div>
            <div className="h-2 bg-gray-200 my-4 rounded-lg"></div>
            {props.children}
            Test: {props.kommentar ? props.kommentar : "null"}
        </div>
    )
}
export default FeilmeldingsInnhold;
