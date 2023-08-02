import { FileImageIcon, UploadIcon } from "@navikt/aksel-icons"
import { Button, Heading } from "@navikt/ds-react"


/**
 * Inkluderer en knapp for opplastning i finder/explorer.
 * Inkluderer et felt for drag and drop opplastning av bilder
 * @returns `Drag and drop` komponent for filopplastning av skjermbilder
 */
const BildeOpplastning = () => {
    return(
        <div className="flex gap-2 flex-col">
            <Heading size="xsmall">
                Skjermbilder
            </Heading>
            <div className="
                h-48 p-5 bg-bg-subtle hover:bg-surface-selected border-2 border-blue-500
                rounded-lg border-dashed flex flex-col items-center justify-center text-center gap-2 
            ">
                <FileImageIcon 
                    fontSize="3.5rem"
                    className="text-blue-500"
                /> 
                <p className="text-surface-neutral">Dra og slipp skjermbilder her!</p>
            </div>
            <Button
                variant="secondary"
                icon={<UploadIcon />}
            >
                Last opp skjermbilder
            </Button>     
        </div>

    )
}
export default BildeOpplastning