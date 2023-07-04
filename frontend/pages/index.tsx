import "@navikt/ds-css";
import { Button, Heading } from "@navikt/ds-react";
import axios , { AxiosError } from "axios";
import { log } from "console";
import { useState } from "react"; //useSWR hilsen Emil ;D

async function getWorld() {
  try {
    const {data} : {data: any} = await axios.get("http://0.0.0.0:8080/");
    console.log(data);
    return data
  } catch (error) {
    console.log(error);
  }
}

export default function Home() {
  getWorld();
  return (
    <main className="flex justify-center">
      <div className="w-1/2 flex flex-col gap-4 justify-center text-center">
        <Heading level="1" size="xlarge">Sprik</Heading>
        <Button variant="primary">Meld inn feil</Button>
        <Button variant="secondary">Meld inn funksjonalitetsønsker</Button>
        {/* <p>{getWorld()}</p> */}
      </div>
    </main>
  )
}
