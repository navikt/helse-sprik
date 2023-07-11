import "@navikt/ds-css";
import { ExpansionCard, Tag } from "@navikt/ds-react";

const TagBar = () => {
    return (
        <div className="flex gap-8">
            <Tag variant="info">Jobbes med</Tag>
            <div className="flex gap-2">
                <Tag variant="neutral">Spleiselaget</Tag>
                <Tag variant="warning">Haster</Tag>
            </div>
        </div>
    )
}

const FeilCard = () => {
    return (
        <ExpansionCard aria-label="tekst">
            <ExpansionCard.Header>
                <ExpansionCard.Title>Dummy</ExpansionCard.Title>
                <ExpansionCard.Description>
                    Dummy Dummy Java 
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
