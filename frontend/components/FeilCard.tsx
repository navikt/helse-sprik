import "@navikt/ds-css";
import { ExpansionCard, Tag } from "@navikt/ds-react";

interface feilmeldingInterface {
    tittel: String,
    beskrivelse: String
}

const TagBar = () => {
    return (
        <div className="flex gap-8 mt-4">
            <Tag variant="info">Jobbes med</Tag>
            <div className="flex gap-2">
                <Tag variant="neutral">Spleiselaget</Tag>
                <Tag variant="warning">Haster</Tag>
            </div>
        </div>
    )
}

const FeilCard = (props: feilmeldingInterface) => {
    return (
        <ExpansionCard aria-label="tekst">
            <ExpansionCard.Header>
                <ExpansionCard.Title>{props.tittel}</ExpansionCard.Title>
                <ExpansionCard.Description>
                    {props.beskrivelse}
                </ExpansionCard.Description>
                <TagBar />
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                Hællæ
            </ExpansionCard.Content>
        </ExpansionCard>
    )
}

export default FeilCard;
