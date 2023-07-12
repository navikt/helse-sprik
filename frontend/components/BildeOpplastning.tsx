import { FileImageIcon, UploadIcon } from "@navikt/aksel-icons"
import { Button } from "@navikt/ds-react"


/**
 * Inkluderer en knapp for opplastning i finder/explorer.
 * Inkluderer et felt for drag and drop opplastning av bilder
 * @returns `Drag and drop` komponent for filopplastning av skjermbilder
 */
const BildeOpplastning = () => {
    return(
        <div className="flex gap-2 flex-col">
            <div className="
                h-64 p-5 bg-bg-subtle hover:bg-surface-selected border-2 border-blue-500
                rounded-lg border-dashed flex flex-col items-center justify-center text-center gap-2 
            ">
            {/*
            Finn ut av hvordan man farger ikoner fra aksel 
                <FileImageIcon 
                    fontSize="4rem"
                    fill="blue-500"
                /> 

            foreløpig brukes svg fra figma:
            */}
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 56 56" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14.75 45.9167V10.0833H31.9167V18.1667C31.9167 18.857 32.4763 19.4167 33.1667 19.4167H41.25V45.9167H40.0829L30.9722 32.2506C30.8331 32.042 30.5989 31.9167 30.3481 31.9167C30.0974 31.9167 29.8632 32.042 29.7241 32.2506L20.6134 45.9167H14.75ZM21.0033 47.4167C21.0105 47.4168 21.0177 47.4168 21.025 47.4167H39.6713C39.6785 47.4168 39.6858 47.4168 39.693 47.4167H41.5C42.1904 47.4167 42.75 46.857 42.75 46.1667V18.6667C42.75 18.4678 42.671 18.277 42.5303 18.1363L33.197 8.80301C33.0563 8.66235 32.8656 8.58334 32.6667 8.58334H14.5C13.8096 8.58334 13.25 9.14298 13.25 9.83334V46.1667C13.25 46.857 13.8096 47.4167 14.5 47.4167H21.0033ZM38.2801 45.9167H22.4162L30.3481 34.0188L38.2801 45.9167ZM40.1893 17.9167L33.4167 11.144V17.9167H40.1893ZM23.3333 21.75C21.8146 21.75 20.5833 22.9812 20.5833 24.5C20.5833 26.0188 21.8146 27.25 23.3333 27.25C24.8521 27.25 26.0833 26.0188 26.0833 24.5C26.0833 22.9812 24.8521 21.75 23.3333 21.75ZM19.0833 24.5C19.0833 22.1528 20.9861 20.25 23.3333 20.25C25.6805 20.25 27.5833 22.1528 27.5833 24.5C27.5833 26.8472 25.6805 28.75 23.3333 28.75C20.9861 28.75 19.0833 26.8472 19.0833 24.5Z" fill="#0067C5"/>
                </svg>
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