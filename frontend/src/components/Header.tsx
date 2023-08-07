import { InternalHeader } from "@navikt/ds-react"

/**
 * Headeren til applikasjonen, inneholder logo og lenke til hovedsiden.
 */
const Header = () => {
    return(
        <InternalHeader>
            <InternalHeader.Title href="/#home">
                Sprik
            </InternalHeader.Title>
        </InternalHeader>
    )
}
export default Header