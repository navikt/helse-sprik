"use client"

import React from 'react'

import "@navikt/ds-css";
import { Button } from "@navikt/ds-react";

export default function Home() {
  return (
    <main className="bg-surface-subtle flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold text-center">
          Sprik
          <Button variant="primary">Rapporter feil</Button>
        </h1>
    </main>
  )
}