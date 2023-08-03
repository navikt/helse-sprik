import { Modal } from "@navikt/ds-react"
import { Dispatch, SetStateAction } from "react"


interface modalInterface {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    children: React.ReactNode
}

const FeilModal = (props: modalInterface) => {
    return(                  
        <Modal
            className="w-3/5 min-w-2/4 p-5"
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