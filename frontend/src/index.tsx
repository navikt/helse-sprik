import KortKonteiner from "./components/KortKonteiner";
import "@navikt/ds-css";
import { Button, Heading, Search } from "@navikt/ds-react";
import Header from "./components/Header";
import { PlusIcon } from "@navikt/aksel-icons";
import Filtermeny from "./components/Filtermeny";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Feilmelding } from "./interface";

/**
 * Hovedsiden til applikasjonen, viser alle innmeldte feil.
 * Tilbyr søkefelt og filtreringsmuligheter
 * Tilbyr også navigering til feilinnmeldingssiden
 */
export default function Home() {
  const navigate = useNavigate()
  const [feilmeldinger, setFeilmeldinger] = useState<Feilmelding[]>([]);

  
  const hentAlleFeil = async () => {    
    const { data } = await axios.get("/api/hentallefeil")
    setFeilmeldinger(data)
  }
  
  useEffect(() => {
    hentAlleFeil();
  }, [])


  //oppdaterer visningen av feilmeldinger når søkefeltet endres
  const handleSearch = async (soketekst: string) => {
    if (soketekst === "") {
      hentAlleFeil()
      return
    }
    const { data } = await axios.get(`/api/hentsok/${soketekst}`)
    setFeilmeldinger(data)
  }


  return (
    <main className="flex flex-col h-screen">
      <Header/>
      <div className="flex grow">
        <Filtermeny/>
        <div className="grow bg-bg-subtle px-32 py-8 flex flex-col gap-10">
          <Heading level="1" size="xlarge">Innmeldte feil</Heading>
          <div className="flex gap-12 items-end">
            <Search 
              data-testid="soke-inputfelt"
              label="Søkefelt"
              description="Søk gjennom innmeldte feil (nøkkelord, tags, status)"
              hideLabel={false}
              onChange={soeketekst => handleSearch(soeketekst)}
            />
            <Button 
              className="w-64 h-min" 
              icon={<PlusIcon aria-label="PlusIcon"/>}
              onClick={() => navigate("nyfeil")}  
            >
              Meld inn feil
            </Button>
          </div>
          <KortKonteiner reset={hentAlleFeil} feilmeldinger={feilmeldinger}/>
        </div>
      </div>
    </main>
  )
}
