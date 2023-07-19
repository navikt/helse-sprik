import CardsContainer from "./components/CardsContainer";
import "@navikt/ds-css";
import { Button, Search } from "@navikt/ds-react";
import Header from "./components/Header";
import { PlusIcon } from "@navikt/aksel-icons";
import Filtermeny from "./components/Filtermeny";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate()

  return (
    <main className="flex flex-col h-screen">
      <Header/>
      <div className="flex grow">
        <Filtermeny/>
        <div className="grow bg-bg-subtle px-32 py-10 flex flex-col gap-10">
          <div className="flex gap-12 items-end">
            <Search label="Søkefelt" hideLabel={false}/>
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
