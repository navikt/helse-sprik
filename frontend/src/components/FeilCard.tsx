import "@navikt/ds-css";
import { Heading, Tag } from "@navikt/ds-react";
import { IFeilmelding } from "../interface";

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
    return(
        <div className="
            bg-bg-default border border-border-default p-7 rounded-lg 
            flex justify-between flex-col
            hover:bg-bg-subtle hover:border-border-strong hover:shadow-md duration-100
            active:bg-surface-active
            ">
            <div>
                <Heading size="medium">{props.tittel}</Heading>
                <p>{props.beskrivelse}</p>       
            </div>
            <TagBar haster={false}/>
        </div>
    )
}
