import "@navikt/ds-css";
import { Button, Heading, Tag } from "@navikt/ds-react";
import { IFeilmelding } from "../interface";
import { createContext, useContext, useState } from "react";
import { XMarkIcon } from "@navikt/aksel-icons";

interface TagBarInterface {
    haster: boolean
}

interface HeaderInterface {
    tittel: string,
    beskrivelse: string,
    haster: boolean
}

const visningsContext = createContext({
    visHeleKortet: false,
    setVisHeleKortet: (value: boolean) => {}
})

export const FeilCard = (props: IFeilmelding) => {
    const [visHeleKortet, setVisHeleKortet] = useState(false)
    const visningsModus = {visHeleKortet, setVisHeleKortet}

    return(
        <visningsContext.Provider value={visningsModus}>
            <div className="
                bg-bg-default border border-border-default p-7 rounded-lg 
                hover:bg-bg-subtle hover:border-border-strong hover:shadow-md duration-100
                active:bg-surface-active
                "
                onClick={() => {
                    setVisHeleKortet(true)
                }}>
                <FeilkortHeader tittel={props.tittel} beskrivelse={props.beskrivelse} haster={false}/>
                <FullvisningsKort tittel={props.tittel} beskrivelse={props.beskrivelse} dato={new Date()}/>
            </div>
        </visningsContext.Provider>
    )
}

const FullvisningsKort = (props: IFeilmelding) => {
    const {visHeleKortet, setVisHeleKortet} = useContext(visningsContext)
    return(
         visHeleKortet ? 
            <div className="h-screen w-screen absolute top-0 right-0 bg-grayalpha-800">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="bg-bg-default border border-border-default p-7 rounded-lg w-1/2">
                        <div className="flex justify-between gap-4">
                            <FeilkortHeader tittel={props.tittel} beskrivelse={props.beskrivelse} haster={true}/>
                            <Button
                                icon={<XMarkIcon/>}
                                className="max-h-14 min-w-fit"
                                variant="secondary"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setVisHeleKortet(false)
                                }}
                            >
                                Lukk
                            </Button>                            
                        </div>
                        <div className="h-1 bg-bg-subtle w-full my-4"></div>
                    </div>                    
                </div>
            </div> 
        : <></>
    )
}


//typen på status er veldig wack heheheh, må fjerne any etterhvert men String fungerer ikke 
const TagBar = (props: TagBarInterface) => {
    return (
        <div className="flex gap-8 mt-4">
            <Tag variant="info">Jobbes med</Tag>
            {props.haster === true ? <Tag variant="warning">Haster</Tag> : <></>}
        </div>
    )
}


const FeilkortHeader = (props: HeaderInterface) => {
    return(
        <div className="flex justify-between flex-col">
            <div>
                <Heading size="medium">{props.tittel}</Heading>
                <p>{props.beskrivelse}</p>       
            </div>  
            <TagBar haster={props.haster}/>              
        </div>
    )
}