import CardsContainer from "./components/CardsContainer";
import "@navikt/ds-css";
import { Button, Search } from "@navikt/ds-react";
import Header from "./components/Header";
import { PlusIcon } from "@navikt/aksel-icons";
import Filtermeny from "./components/Filtermeny";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Feilmelding } from "./interface";

export default function Home() {
  const navigate = useNavigate()
  
  const [feilmeldinger, setFeilmeldinger] = useState<Feilmelding[]>([]);

  /**
   * Henter alle feilmeldinger fra backend.
   * Bruker endepunktet /api/hentallefeil.
   */  
  const hentAlleFeil = async () => {
    await axios.get("/api/hentallefeil")
      .then(data => data.data)
      .then(feil => {
        setFeilmeldinger(
          feil.map((jsonFeilmelding: any) => new Feilmelding(jsonFeilmelding))
        );
      })
  }

  // Sørger for at hentAlleFeil() kun kjører når komponentet laster inn
  useEffect(() => {
    hentAlleFeil();
  }, [])

  /**
   * Oppdaterer viste feilmeldinger ved endring i søkefelt.
   * Kontakter endepunktet /api/hentsok/.
   * @param soketekst 
   */
  const handleSearch = async (soketekst: string) => {
    // Ved tomt søkefelt hentes alle feilmeldinger
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
          <div className="flex gap-12 items-end">
            <Search 
              label="Søkefelt"
              description="Søk gjennom innmeldte feil (nøkkelord, tags, status)"
              hideLabel={false}
              onChange={soeketekst => handleSearch(soeketekst)}
            />
            <Button 
              className="w-64 h-min" 
              icon={<PlusIcon/>}
              onClick={() => navigate("nyfeil")}  
            >
              Meld inn feil
            </Button>
          </div>
          <CardsContainer feilmeldinger={feilmeldinger}/>
        </div>
      </div>
    </main>
  )
}
