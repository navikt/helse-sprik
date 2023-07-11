import CardsContainer from "@/components/CardsContainer";
import "@navikt/ds-css";
import { Button, Heading, Search } from "@navikt/ds-react";
import router from "next/router";

export default function Home() {
  const handleFeil = () => {
    router.push('/feil')
  }

  return (
    <main className="flex flex-col h-screen">
      <div className="h-12 bg-gray-900"></div>
      <div className="flex justify-center grow">
        <div className="bg-bg-subtle w-1/6 p-8 flex flex-col justify-end">
          <div className="flex flex-col gap-4 text-center bottom-0">
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
        </div>

        <div className="p-8 grow flex gap-8 flex-col">
          <Search
            label="Søk gjennom innmeldte feil (nøkkelord, tags, status)"
            variant="primary"
            hideLabel={false}
          />
          <Heading 
            level="1" 
            size="medium"
          >
            Innmeldte feil (saker, feilmeldinger poster, feil)
          </Heading>
          <CardsContainer/>
        </div>

        <div className="bg-bg-subtle w-1/6 p-8">
          <h1>Filter to be</h1>
        </div>
      </div>
    </main>
  )
}
