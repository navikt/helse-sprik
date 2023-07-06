import FeilCard from "../components/FeilCard";
import "@navikt/ds-css";
import { Button, Heading, Search } from "@navikt/ds-react";
import axios , { Axios, AxiosError } from "axios";
import { log } from "console";
import useSWR from "swr";


const fetcher = (url: any) => axios.get(url).then(res => res.data)

export default function Home() {

  // const {data, error, isLoading} = useSWR('http://0.0.0.0:8080/', fetcher);
  // console.log(data);

  return (
    <main className="flex flex-col py-8 justify-center">
      <Search
        label="Søk gjennom innmeldte feil (nøkkelord, tags, status)"
        variant="primary"
        hideLabel={false}
      />
      <Heading level="1" size="medium">Innmeldte feil (saker, feilmeldingerm poster, feil)</Heading>

      <div className="w-1/2 flex flex-col gap-4 justify-center text-center">
        <Button variant="primary">Meld inn feil</Button>
        <Button variant="secondary">Meld inn funksjonalitetsønsker</Button>
      
        {/* {data ? <div>{data}</div> : <div>Laster</div>} */}
      </div>
      <FeilCard />
    </main>
  )
}
