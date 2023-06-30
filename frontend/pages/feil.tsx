import "@navikt/ds-css";

import { Button, Heading, TextField, Textarea } from "@navikt/ds-react";
import { BugIcon, UploadIcon, ArrowLeftIcon } from "@navikt/aksel-icons";

export default function Home() {
    return (
      <main className="flex flex-col justify-center gap-32 p-16">
        <div className="w-1/2 flex flex-col gap-4 justify-center">
            <BugIcon 
                title="Insekts ikon" 
                fontSize="3rem" 
            />
            <Heading 
                level="1" 
                size="xlarge"
            >
                    Innmelding av feil i speil
            </Heading>
        </div>
        <div className="w-1/2 flex flex-col gap-4 justify-center">
            <TextField 
                label="Tittel" 
                description="En kort oppsummering av problemet" 
            />
            <Textarea 
                label="Beskrivelse" 
                description="Detaljert beskrivelse av problemet" 
            />

            <Button 
                variant="secondary"
                icon={<UploadIcon />}
            >
                Last opp skjermbilder
            </Button>
        </div>
        <div className="w-1/2 flex flex-col gap-2 justify-center">
            <Button
                variant="primary"
            >
                Meld inn feil
            </Button>
            <Button
                variant="tertiary"
                icon={<ArrowLeftIcon />}
            >
                Gå tilbake til hovedmenyen
            </Button>
        </div>

      </main>
    )
  }