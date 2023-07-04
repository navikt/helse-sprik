import "@navikt/ds-css";
import { Button, Heading } from "@navikt/ds-react";
import axios , { Axios, AxiosError } from "axios";
import useSWR from "swr";

const fetcher = (url: any) => axios.get(url).then(res => res.data)

function fetching() {
  const {data, error, isLoading} = useSWR('http://0.0.0.0:8080/', fetcher);
  if (error) return <div>failed to load: {error.message}</div>
  if (isLoading) return <div>Loading...</div>
  return <div>{data.data}</div>
}

export default function Home() {
  return (
    <main className="flex justify-center">
      <div className="w-1/2 flex flex-col gap-4 justify-center text-center">
        <Heading level="1" size="xlarge">Sprik</Heading>
        <Button variant="primary">Meld inn feil</Button>
        <Button variant="secondary">Meld inn funksjonalitetsønsker</Button>
        {fetching()}
      </div>
    </main>
  )
}
