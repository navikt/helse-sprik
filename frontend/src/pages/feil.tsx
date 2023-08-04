import "@navikt/ds-css";

import { ArrowLeftIcon, BugIcon } from "@navikt/aksel-icons";
import { Alert, Button, Chips, Heading, Switch, TextField, Textarea } from "@navikt/ds-react";
import axios from "axios";
import { useState } from "react";
import BildeOpplastning from "../components/BildeOpplastning";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Skillelinje from "../components/Skillelinje";

export default function Feil() {
    const [tittel, setTittel] = useState("");
    const [beskrivelse, setBeskrivelse] = useState("");
    const [status, setStatus] = useState(0)
    const [haster, setHaster] = useState(false)
    const [valgteTags, setValgteTags] = useState([] as string[]);
    const [aktorid, setAktorid] = useState<number|null>(null);
    
    const handleSubmit = () => {
        const payload = {
            id: null,
            tittel: tittel,
            beskrivelse: beskrivelse,
            dato: new Date().toISOString().replace('Z', ''), // Litt wack fix, burde endres
            arbeidsstatus: 0,
            haster: haster,
            kommentar: null,
            aktorid: aktorid ? aktorid : null,
            //kategorier: valgteTags
        }
        
        axios.post("/api/nyfeil", payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                setStatus(response.status)
            }).catch((error) => {
                console.log(error);
            })
    }

    const handleAlerts = () => {
        if (status === 201) {
            console.log("Feil lagt til i database");
            setTimeout(() => 
            {
                navigate("/");
            },
            5000);           
            return <Alert variant="success">Feil er meldt inn! Du vil nå sendes tilbake til hovedmenyen om fem sekunder.</Alert>
        } else {
            console.log("Noe gikk galt, feil ikke lagt til i database!");
            return <Alert variant="error">Noe gikk galt! Prøv igjen om noen minutter.</Alert>
        }
    }

        // TODO: clear data fra felter


    const navigate = useNavigate()

    const tags = [
        "Utbetaling",
        "Inntekt",
        "Speil",
        "Annet"
    ];

    return (
        <main className="flex flex-col h-screen">
            <Header/>
            <div className="flex items">
                <div className=" bg-bg-subtle grow"></div>

                <div className="w-3/5 flex flex-col justify-center gap-8 px-16 py-8">
                    <div className=" flex flex-col gap-2 justify-center">
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
                            data-testid="tittel-inputfelt"
                            label="Tittel"
                            onChange={e => setTittel(e.target.value)}
                        />

                        <Textarea
                            data-testid="beskrivelse-inputfelt"
                            label="Beskrivelse"
                            description="Detaljert beskrivelse av problemet"
                            onChange={e => setBeskrivelse(e.target.value)}
                        />
                        <Skillelinje/>
                        <BildeOpplastning/>

                        <Skillelinje/>
                        <Heading size="xsmall">
                            Haster det å fikse feilen?
                        </Heading>
                        <Switch
                            data-testid="switch-toggle"
                            onClick={() => setHaster(!haster)}
                        >
                            Saken Haster
                        </Switch>

                        <Skillelinje/>
                        <TextField
                            label="Aktør-ID (valgfritt)"
                            description="Legg ved aktør-ID om det er relevant"
                            onChange={e => setAktorid(parseInt(e.target.value))}
                        />

                        <Skillelinje/>
                        <Heading size="xsmall">
                            Velg kategorier som passer
                        </Heading>
                        <Chips>
                        {tags.map((c) => (
                            <Chips.Toggle
                            selected={valgteTags.includes(c)}
                            key={c}
                            onClick={() =>
                                setValgteTags(
                                valgteTags.includes(c)
                                    ? valgteTags.filter((x) => x !== c)
                                    : [...valgteTags, c]
                                )
                            }
                            >
                            {c}
                            </Chips.Toggle>
                        ))}
                        </Chips>

                    </div>
                    <div className="w-1/2 flex flex-col gap-2 justify-center mt-8">
                        {status != 0 ? handleAlerts() : <></>}
                        <Button
                            onClick={handleSubmit}
                            variant="primary"
                        >
                            Meld inn feil
                        </Button>
                        <Button
                            variant="tertiary"
                            icon={<ArrowLeftIcon />}
                            onClick={() => navigate("/")}
                        >
                            Gå tilbake til hovedmenyen
                        </Button>
                    </div>                
                </div>

                <div className=" bg-bg-subtle grow"></div>
            </div>
        </main>
    )
}