import "@navikt/ds-css";

import { ArrowLeftIcon, BugIcon, UploadIcon } from "@navikt/aksel-icons";
import { Button, Heading, TextField, Textarea } from "@navikt/ds-react";
import post from "../api/http";
import { useState } from "react";
import router from "next/router";
import BildeOpplastning from "@/components/BildeOpplastning";

export default function Feil() {
    const [tittel, setTittel] = useState("");
    const [beskrivelse, setBeskrivelse] = useState("");

    const handleSubmit = () => {
        const data = {
            "tittel": tittel,
            "beskrivelse": beskrivelse
        };

        post("/nyFeil", data)
        
        // TODO: clear data fra felter
    }

    return (
        <main className="flex flex-col h-screen">
                  
            <div className="h-12 bg-gray-900"></div>

            <div className="flex grow">
                <div className="w-1/4 bg-bg-subtle"></div>
                <div className="flex flex-col justify-center gap-32 p-16 grow">
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
                        <BildeOpplastning/>
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
                            onClick={() => {
                                router.push('/')
                            }}
                        >
                            Gå tilbake til hovedmenyen
                        </Button>
                    </div>                
                </div>
                <div className="w-1/4 bg-bg-subtle"></div>
            </div>
        </main>
    )
}