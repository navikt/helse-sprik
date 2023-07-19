import "@navikt/ds-css";
import { ExpansionCard, Tag } from "@navikt/ds-react";

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

const FeilCard = (props: Feilmelding) => {
    return (
        <ExpansionCard aria-label="tekst">
            <ExpansionCard.Header>
                <ExpansionCard.Title>{props.tittel}</ExpansionCard.Title>
                <ExpansionCard.Description>
                    {props.beskrivelse}
                </ExpansionCard.Description>
                <TagBar haster={props.haster}/>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                Hællæ
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}

export default FeilCard;
