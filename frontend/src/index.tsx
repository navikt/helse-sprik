import CardsContainer from "./components/CardsContainer";
import "@navikt/ds-css";
import { Button, Search } from "@navikt/ds-react";
import Header from "./components/Header";
import { PlusIcon } from "@navikt/aksel-icons";
import Filtermeny from "./components/Filtermeny";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate()

  const handleChange = (soeketekst: string) => {
    console.log("search changed")  

    axios.post("/api/hentsok", soeketekst, {
      headers: {
          'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
        console.log(error);
    })
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
              onChange={(soeketekst) => handleChange(soeketekst)}
            />
            <Button 
              className="w-64 h-min" 
              icon={<PlusIcon/>}
              onClick={() => navigate("nyfeil")}  
            >
              Meld inn feil
            </Button>
          </div>
          <CardsContainer/>
        </div>
      </div>
    </main>
  )
}
