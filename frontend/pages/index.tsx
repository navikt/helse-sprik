import "@navikt/ds-css";

import { Button, Heading } from "@navikt/ds-react";

const axios=require('axios').default




async function getWorld() {
  axios.get("/")
  .then((response : any) => {
    console.log(response);
  }).catch((error : any) => {
    console.log(error);
  })
}
  

export default function Home() {
  getWorld();
  return (
    <main className="flex justify-center">
      <div className="w-1/2 flex flex-col gap-4 justify-center text-center">
        <Heading level="1" size="xlarge">Sprik</Heading>
        <Button variant="primary">Meld inn feil</Button>
        <Button variant="secondary">Meld inn funksjonalitetsønsker</Button>
      </div>
    </main>
  )
}
