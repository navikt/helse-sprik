import "@navikt/ds-css";

import { ArrowLeftIcon, BugIcon } from "@navikt/aksel-icons";
import { Alert, Button, Heading, TextField, Textarea } from "@navikt/ds-react";
import axios from "axios";
import { useState } from "react";
import BildeOpplastning from "../components/BildeOpplastning";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { backendURL } from "../const";

export default function Feil() {
    const [tittel, setTittel] = useState("");
    const [beskrivelse, setBeskrivelse] = useState("");
    const [status, setStatus] = useState(0)

    const handleSubmit = () => {

        const payload = {
            tittel: tittel,
            beskrivelse: beskrivelse,
            dato: new Date().toISOString().replace('Z', '')
        }
        
        axios.post(backendURL + "/api/nyfeil", payload, {
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
            return <Alert variant="success">Feil er meldt inn! Du vil nå sendes tilbake til hovedmenyen.</Alert>
            //TODO wait 5 seconds and redirect to home
        } else {
            console.log("Noe gikk galt, feil ikke lagt til i database!");
            return <Alert variant="error">Noe gikk galt! Prøv igjen om noen minutter.</Alert>
        }
    }

        // TODO: clear data fra felter


    const navigate = useNavigate()

    return (
        <main className="flex flex-col h-screen">
            <Header/>
            <div className="flex grow">
                <div className="w-1/4 bg-bg-subtle"></div>
                <div className="flex flex-col justify-center gap-16 p-8 px-16  grow">
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
                            label="Tittel"
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
                <div className="w-1/4 bg-bg-subtle"></div>
            </div>
        </main>
    )
}