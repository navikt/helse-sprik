import "@navikt/ds-css";

import { ArrowLeftIcon, BugIcon, UploadIcon } from "@navikt/aksel-icons";
import { Button, Heading, TextField, Textarea } from "@navikt/ds-react";
import post from  "./api/http";
import { useState } from "react";

export default function Home() {
    const [tittel, setTittel] = useState("");
    const [beskrivelse, setBeskrivelse] = useState("");

    const handleSubmit = () => {
        //hent ut data fra felter lagre i var
    
        console.log("submit");
    
        const data = {
            "tittel": tittel,
            "beskrivelse": beskrivelse
        };

        console.log(data);
        
    
        post("/nyFeil", data)
        //clear data fra felter
    }

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
                onChange={e => setTittel(e.target.value)}
            />
            <Textarea 
                label="Beskrivelse" 
                description="Detaljert beskrivelse av problemet"
                onChange={e => setBeskrivelse(e.target.value)} 
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
                onClick={handleSubmit}
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