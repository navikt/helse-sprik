import { Modal } from "@navikt/ds-react"
import { Dispatch, SetStateAction } from "react"


interface modalInterface {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    children: React.ReactNode
}

/**
 * Modal som brukes til å vise feilmeldinger i fullvisningsmodus med feilinnhold og redigeringsverktøy
 * @param open boolean som beskriver om modalen skal være åpen eller ikke
 * @param setOpen setter open
 * @param children innholdet i modalen
 */
const FeilModal = (props: modalInterface) => {
    return(                  
        <Modal
            className="w-3/5 p-5"
            open={props.open}
            aria-label={" modal"}
            onClose={() => props.setOpen(false)}
            aria-labelledby="modal-heading"
            closeButton={false}
        >
        <Modal.Content>
            {props.children}
        </Modal.Content>
    </Modal>
    )
}
export default FeilModal;