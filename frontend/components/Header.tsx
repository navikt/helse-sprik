import { MenuGridIcon } from "@navikt/aksel-icons"
import { InternalHeader, Dropdown } from "@navikt/ds-react"

const Header = () => {
    return(
        <InternalHeader>
            <InternalHeader.Title href="/#home">
                Sprik
            </InternalHeader.Title>
            <Dropdown>
                <InternalHeader.Button
                    as={Dropdown.Toggle}
                >
                    <MenuGridIcon title="MenuGridIconer og oppslagsverk" />
                </InternalHeader.Button>
            {/* <Dropdown.Menu /> */}
            </Dropdown>
        </InternalHeader>
    )
}
export default Header