import FeilCard from "../components/FeilCard";
import "@navikt/ds-css";
import { Button, Heading, Search } from "@navikt/ds-react";
import router from "next/router";

export default function Home() {

  const handleFeil = () => {
    router.push('/feil')
  }

  return (
    <main className="flex flex-col py-8 justify-center">
      <Search
        label="Søk gjennom innmeldte feil (nøkkelord, tags, status)"
        variant="primary"
        hideLabel={false}
      />
      <Heading 
        level="1" 
        size="medium"
      >
        Innmeldte feil (saker, feilmeldingerm poster, feil)
      </Heading>
      <div className="w-1/2 flex flex-col gap-4 justify-center text-center">
        <Button 
          variant="primary" 
          onClick={handleFeil}
        >
          Meld inn feil
        </Button>
        <Button 
          variant="secondary"
        >
          Meld inn funksjonalitetsønsker
        </Button>
      </div>
      <FeilCard />
    </main>
  )
}
