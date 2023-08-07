import { FileImageIcon, UploadIcon } from "@navikt/aksel-icons"
import { Button, Heading } from "@navikt/ds-react"


/**
 * BildeOpplastningskomponentet brukes for å laste opp skjermbilder av en feil i Speil.
 * Komponentet er ment for å støtte både drag-and-drop og vanlig opplasting av bilder.
 * @TODO: Implementer funksjonalitet for å laste opp bildefiler -> API og backend
 */
const BildeOpplastning = () => {
    return(
        <div className="flex gap-2 flex-col">
            <Heading size="xsmall">
                Skjermbilder
            </Heading>
            <div className="h-48 p-5 bg-bg-subtle hover:bg-surface-selected border-2 border-blue-500 rounded-lg border-dashed flex flex-col items-center justify-center text-center gap-2">
                <FileImageIcon 
                    fontSize="3.5rem"
                    className="text-blue-500"
                /> 
                <p className="text-surface-neutral">
                    Dra og slipp skjermbilder her!
                </p>
            </div>
            <Button variant="secondary" icon={<UploadIcon />}>
                Last opp skjermbilder
            </Button>     
        </div>

    )
}
export default BildeOpplastning