import { ChatElipsisIcon, PencilIcon, XMarkIcon } from "@navikt/aksel-icons"
import { Button, Chat, TextField, Textarea } from "@navikt/ds-react"
import { FeilmeldingsInnholdInterface } from "../interface"
import FeilkortHeader from "./FeilkortHeader"
import { useState } from "react"


const FeilmeldingsInnhold = (props: FeilmeldingsInnholdInterface) => {
    const [kommentar, setKommentar] = useState("") 
    const [kommentarfelt, setKommentarfelt] = useState("")

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
                        variant="tertiary"
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
            {kommentar.length === 0 ? <></> : (<Kommentar tekst={kommentar}/>)}
            <div className="flex items-end gap-12 w-full mt-12">
                <TextField
                    className="grow"
                    label="Skriv inn din kommentar til feilen"
                    value={kommentarfelt}
                    onChange={e => setKommentarfelt(e.target.value)}
                >

                </TextField>
                <Button
                    variant="secondary"
                    icon={<ChatElipsisIcon/>}
                    onClick={() => {
                        setKommentar(kommentarfelt)
                    }}
                >
                    Legg til kommentar
                </Button>
            </div>
        </div>
    )
}
export default FeilmeldingsInnhold;


const Kommentar = ({tekst} : {tekst: string}) => {
    return(
            <Chat>
                <Chat.Bubble from="user" timestamp="10:00">
                    <p>{tekst}</p>
                </Chat.Bubble>
            </Chat>
    )
}