import "@navikt/ds-css";

import { Button, Heading } from "@navikt/ds-react";

export default function Home() {
  return (
    <main className="flex justify-center">
      <div className="w-1/2 flex justify-center">
        <Heading level="1" size="xlarge">Sprik</Heading>
        <Button variant="secondary">Test</Button>
      </div>
    </main>
  )
}
