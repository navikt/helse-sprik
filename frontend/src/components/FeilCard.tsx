import "@navikt/ds-css";
import { Button, Heading, Tag } from "@navikt/ds-react";
import { IFeilmelding } from "../interface";
import { useState } from "react";

interface TagBarInterface {
    haster: boolean
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

// const FeilCard1 = (props: IFeilmelding) => {
//     return (
//         <ExpansionCard aria-label="tekst">
//             <ExpansionCard.Header>
//                 <ExpansionCard.Title>{props.tittel}</ExpansionCard.Title>
//                 <ExpansionCard.Description>
//                     {props.beskrivelse}
//                 </ExpansionCard.Description>
//                 <TagBar haster={true}/>
//             </ExpansionCard.Header>
//             <ExpansionCard.Content>
//                 Hællæ
//             </ExpansionCard.Content>
//         </ExpansionCard>
//     )
// }
// export default FeilCard1;

export const FeilCard = (props: IFeilmelding) => {
    const [visFeilinformasjon, setVisFeilinformasjon] = useState(false)

    const FullvisningsKort = () => {    
        return(
            <div className="h-screen w-screen absolute top-0 right-0 bg-grayalpha-800">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="
                        bg-bg-default border border-border-default p-7 rounded-lg
                        h-1/2 w-1/2
                    ">
                        <Button onClick={() => {
                                setVisFeilinformasjon(false)
                        }}>
                            Avslutt kortvisning
                        </Button>
                    </div>                    
                </div>
            </div>
        )
    }

    return(
        <div className="
            bg-bg-default border border-border-default p-7 rounded-lg 
            flex justify-between flex-col
            hover:bg-bg-subtle hover:border-border-strong hover:shadow-md duration-100
            active:bg-surface-active
            "
            onClick={() => {
                setVisFeilinformasjon(true)
            }}>

            <div>
                <Heading size="medium">{props.tittel}</Heading>
                <p>{props.beskrivelse}</p>       
            </div>
            <TagBar haster={false}/>

            {visFeilinformasjon ? <FullvisningsKort/> : <></>}
        </div>
    )
}
