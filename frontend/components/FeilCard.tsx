import "@navikt/ds-css";
import { ExpansionCard, Tag } from "@navikt/ds-react";

const TagBar = () => {
    return (
        <div>
            <Tag variant="info">Jobbes med</Tag>
            <div>
                <Tag variant="neutral">Spleiselaget</Tag>
                <Tag variant="neutral">Haster</Tag>
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
                    <TagBar />
                </ExpansionCard.Description>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                Hællæ
            </ExpansionCard.Content>

        </ExpansionCard>
    )
}

export default FeilCard;
