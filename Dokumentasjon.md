# Sprik

## Introduksjon
Som en del av forarbeidet til utviklingen av Sprik ble det gjort omfattende dokumentasjon av behovet for en ny løsning, og hvordan en eventuell løsning ville være hensiktsmessig å utforme.

Dokumentasjonen er resultatet av brukerintervjuer, innsiktsarbeid, prototyping og funksjonalitetsprioritering.

Dokumentasjonen beskriver teknologien bak applikasjonen, referater fra innsiktsarbeidet, lenker til prototypeskissering i Figma, ROS og definerer problemet som Sprik skal løse.

## Innholdsfortegnelse

[Prosjekt plan](#prosjekt-plan)

- [Bakgrunnsinfo](#bakgrunnsinfo)

- [Problemdefinisjon](#problemdefinisjon)

- [Objective / Mål](#objective--mål)

    - [Key Results](#key-results)

[Teknologier](#teknologier)

- [React & Typescript](#react--typescript)
- [Aksel & TailwindCSS](#aksel--tailwindcss)
- [Axios & Ktor](#axios--ktor)
- [Kotlin](#kotlin)
- [PostegreSQL & Flyway](#postgresql--flyway)
- [HikariCP & Exposed](#hikaricp--exposed)
- [JUnit & Cypress](#junit--cypress)
- [Yarn & Gradle](#yarn--gradle)

[Kartlegging](#kartlegging)

- [Brukerintervjuer/tester](#brukerintervjuertester)

    - [Utviklingsteam](#utviklingsteam)

        - [Utvikler #1](#utvikler-1)

        - [Utvikler #2](#utvikler-2)

        - [Fagperson](#fagperson)

    - [Saksbehandlere](#saksbehandlere)

        - [Saksbehandler #1](#saksbehandler-1)

        - [Saksbehandler #2](#saksbehandler-2)

        - [Saksbehandler #3](#saksbehandler-3)

        - [Saksbehandler #4](#saksbehandler-4)

        - [Saksbehandler #5](#saksbehandler-5)

- [Brukerhistorier og ønsker](#brukerhistorier-og-ønsker)

- [Funksjonalitet basert på ønsker og problemløsning (MoSCoW)](#funksjonalitet-basert-på-ønsker-og-problemløsning-moscow)

[Jus & Ros](#jus--ros)

[Design](#design)

## Prosjekt plan

### Bakgrunnsinfo
Når saksbehandlere oppdager feil eller avvik i sykepengeløsningen Speil må dette meldes til utviklingsteamet. 

Vår oppgave var å få innsikt i utfordringer ved dagens løsning, behovene til saksbehandlere og utviklingsteamet, samt påbegynne en løsning basert på innsiktsarbeidet.

#### Utfordringer med dagens løsning
- Dagens løsning for kommunikasjon mellom saksbehandlere og teamet er både treig og lang. Saksbehandler → Teams → Coach → slack → Teams

- Det er ikke tilstrekkelig tilgangskontroll for å verne om brukere (personvern), under innmelding av saker. Saker relatert til kode 6 og 7 brukere er veldig utsatte i dagens løsning da de kan formidles mot mange som ikke har tjenstlig behov for informasjonen.

- De fleste saksbehandlere har ikke direkte mulighet til å melde ifra om feil og feature requests hvilket kan føre til at mange feil går under radaren.

- Uoversiktlig presentasjon og formidling av saker fører til at saker rapporteres inn gjentatte ganger (dobbelt arbeid), at de kan glemmes bort, og i verste fall gå uløst.

- Det er et utydelig skille mellom feature-requests og innmeldte feil i dagens løsning. 

- Det er vanskelig å se hvem som er egnet til å besvare

### Problemdefinisjon
Applikasjonens formål er i henhold til oppgaveteksten:

> Lage en applikasjon der saksbehandlere kan melde inn feil/mangler/ønsker. Og potensielt en visning over hva som er meldt inn.
> 

> Feil med speil skal kunne gi både saksbehandlere og utviklere en raskere og bedre flyt i kommunikasjonen. Dette vil føre til at vi utviklere kan oppdage og rette opp i feil raskere. Det vil forhåpentligvis også føre til en bedre saksbehandleropplevelse.
>

### Objective / Mål
"Lage et fantastisk produkt som har ekstremt stor verdi for de fine saksbehandlerne og strålende utviklerne."

Dette mener vi at vi har fått til når:
- 80% av saksbehandlere klarer å melde inn feil (KR1)
- 75% av brukere synes Sprik er mer oversiktlig enn dagens løsninger (KR2)
- Ingen uten tjenstlig behov har tilgang til persondata i innmeldte saker (KR3)

#### Key Results
*KR1 og KR2:*
- Ikke hatt brukertester med saksbehandlere der de får prøve å bruke applikasjonene selv grunnet mangel på tid. Derfor har vi ikke målbare tall.
​
*KR3:*
- Har foreløpig ikke implementert tilgangskontroll.

*Fokus i sommer:*
- Viktige saker første fire uker:
    - Få på plass basic funksjonalitet
    - Forstå hva tjenesten innebærer og illustrere dette i prototype
    - Få deploya applikasjonen i devmiljø
- Viktige saker siste fire uker:
    - Ha en brukervennlig applikasjon
    - Et utvalg av brukere har begynt å teste/ta i bruk applikasjonen
    - Ha en overføringsklar dokumentasjonsbase
    - Implementere alle must-haves

## Teknologier

### React & Typescript
Frontend applikasjonen bygges med React på TypeScript

###  Aksel & TailwindCSS
Applikasjonen er hovedsaklig bygget av komponentbiblioteket til NAVs designsystem Aksel, men egen styling gjøres gjennom utility-first rammeverket TailwindCSS.  Tailwind sine små utilityklasser er kompatible med Aksel og gjør at styling går svært fort. Ikoner og farger er også hentet fra Aksel.

### Axios & Ktor
Axios benyttes som HTTP klient-rammeverk for kommunikasjon med endepunkter i backend. Ktor er en asynkron HTTP server, som brukes som et HTTP API. Ktor hører til Kotlin språket.

### Kotlin 
Kotlin er et moderne javabasert språk. Applikasjonens backend er skrevet i Kotlin.

### PostgreSQL & Flyway
Databasen er skrevet i PostgreSQL og i backenden brukes Flyway rammeverket for migrering av databasen slik at en enkelt kan gjøre endringer på databasen

### HikariCP & Exposed
HikariCP danner en database connection pool mellom DB og backend. Exposed er jetbrains sin SQL-ORM for Kotlin, som brukes til å gjøre spørringer mot databasen. Sammen utgjør de kommunikasjonen mellom Backend og database.

### JUnit & Cypress
JUnit er et Kotlin kompatibelt testrammeverk, og Cypress er et testrammeverk for frontend som kan utføre både komponenttesting og ende-til-ende testing. Cypress-axe er en pakke for cypress som kan brukes til UU-testing.

### Yarn & Gradle
Yarn og Gradle er dependency-management verktøyene for frontend og backend applikasjonene.

## Kartlegging

### Brukerintervjuer/tester

#### Utviklingsteam

##### Utvikler #1
- *Hva anser du som en utfordring ved å bruke dagens løsning (slack)?*
    - Utfordring at mange av saksbehandlerne ikke er på slack
        - Teams = møk
        - Delayed rapportering fordi det er en lang vei
    - Gjentakende rapportering av samme feil
        - Noen kan vurdere det som meldes inn før det går videre til teamet.
    - Usikker på om redteam er nødvendig i kommunikasjonsprosessen
    - Tråd kommunikasjonen er tungvinnt
        - Ting vi har avklart drukner i slack

- *Er det noe du er fornøyd med rundt dagens løsning?*
    - Redteam løsningen vi har i dag fungerer ganske bra, med tanke på å rotere på hvem som er redteam

- *Hva slags arbeidsflyt ønsker du å ha med ny løsning?*
    - Varslinger nice, ellers lite preferanser

- *Hva er spesielt viktig for saksbehandlere/utviklere/jurister/designer/… å få ut av en slik plattform.*
    - Vanskelig å fange opp hvor stor grad en feil skjer.
    - Jetbrains har en issue tracker med voting
    - De kan se hvilke feil som er meldt inn og saksbehandlere skal kunne vote opp spesiellt relevante cases for å se “hvor skoen trykker i systemet”

- *Hvilke data ønsker du skal være presentert om en sak i Sprik?*
    - Greit å ha med innmelder av en sak
    - Greit at utvikler kan labele saker mtp app og sann
    - Kunne generere lapper i Trello.

- *Hvordan kunne du sett for deg at dataen presenteres i sprik?*
    - Enkelt kunne skille feil og feature requests
    - Enkle detaljer
    - Sortere etter traction etc
    - Kanskje tenk gallery view, eller feed.
    - Type feil: Feilinfo, handlingsfeil, grensesnittsfeil etc.

##### Utvikler #2
- *Feature requests*
    - Vanskelig å sørge for at saksbehandlere ikke blir demotiverte dersom endringene ikke skjer.
    - Feature voting side hvor man kan vote opp feature forslag
    - Lar utviklere se hvor skoen trykker
    - Veldig delte meninger

- *Hvilke behov ønsker du at applikasjonen skal dekke? (forstå hva folk vil bruke det til)*
    - “Jeg bruker appen når jeg er redteam”
    - Enkel måte å få vite om noe er galt, vite om noe haster eller ikke”
    - Ikke en stor blob med tekst men kategorisert og organisert.
    - Voting er bra for å se hva som er veldig aktuellt.
    - Hashtags/emneknagger/tags for å organisere i type feil → ser antall feil av en type. 

- *Hvilken funksjonalitet er det viktig for deg at er med i applikasjon?*
    - “Feilen kommer lett frem”, “beskrivelse av casen” hadde vært enkelt med en kort tittel på problemet.
    - Oversikt over hva som er meldt inn tidligere

- *Hvilken funksjonalitet tenker du har mest verdi for deg? Altså hva er viktigst først?*
    - Å kunne kategoriesere hvilke feil man har
    - Få inntrykk av hvilke features som eksisterer samt muligheten til å komme med tilbakemelding.

- *Hva anser du som en utfordring ved å bruke dagens løsning (Slack)?*
    - Ikke god oversikt over hva som er meldt ifra før
    - Vanskelig å se hvem som passer til å svare på spm
    
- *Hva er den største av disse utfordringene?*
    - Vanskelig å ha oversikt over hva som er meldt inn (enklere med status, men tungvinnt).
    - Mistenker dobbelt arbeid
    
- *Er det noe du er fornøyd med rundt dagens løsning?*
    - Mulighet til å ta kontakt med saksbehandlere hvis det trengs (ved feks ønske om flere opplysninger)
    - Trådsvar - nais to have, ikke kritisk
    
- *Hva slags arbeidsflyt ønsker du å ha med ny løsning?*
    - Er en del felter som ville gjort det enklere (Dette går under data også)
        - Skjermbilde
        - Tags
        - AktørID
    - Egendefinerte tags
        - Kan være en utfordring med flere måter å definere et begrep (grunnbeløp vs G vs 6G)
    - Tildele til personer

- *Hva er spesielt viktig for saksbehandlere/utviklere/jurister/designer/… å få ut av en slik plattform.*
    - Unngå dobbeltarbeid
    - Sortere traction eller hvor kritisk det er

- *Hvilke data ønsker du skal være presentert om en sak i Sprik*
    - +aktøride
    - +skjermbilde
    - +tags
    - +tittel,
    - +status
    - +innmeldt saksbehandler
    - statusflagg?
    - forklarende bilde?
    - Saksnummer?
    - Beskrivelse?
    - innsender?
    - mer?
    
- *Hvordan kunne du sett for deg at dataen presenteres i sprik?*
    - Galleri-visning

- *Syntes du at redteam ordningen som et vaktlag skal implementeres videre? har du noe forslag*
    - Red team har tatt lang tid å få til å fungere
    - Er ikke nødvendigvis beste løsning
    - Handler om at man skal rullere for å få noen til å ta ansvar

##### Fagperson
- *Hva er din opplevelse av dagens løsning?*
    - Skille mellom innspill og feil kan være litt uklart
    - Det er bra med direkte kontakt (fine med meldingstjenesten)
    - En del som meldes inn flere ganger
    - En del saksbehandlere man ikke har kontakt med

- *Hvorfor fungerer ikke dagens løsning?*
    - Ikke kontakt med alle saksbehandlere ~ saksbehandler-kanalen kan bli litt uoversiktelig
    - Viktig-info kanalen funker fint ettersom det kun kommer enveis-meldinger
    - Er nok en del feil som glipper (går under radaren/ikke blir meldt inn)

- *Hva er de største utfordringene i dagens løsning?*
    - Går under radaren
        - Hvorfor? Travel hverdag
        - Slack ikke optimal til oppfølging

- *Hva fungerer godt i dagens løsning?*
    - Funker bra at det er en direkte kontakt mellom saksbehandlere og utviklingsteam (ikke erstatte dette)
        - Gir ett forhold til brukeren og løsninga si
    - Mange ting som blir fiksa fortløpende

- *Hva er det viktigste for deg som (utvikler/saksbehandler/…) å oppnå med plattformen?*
    - Hjelpe dem med å jobbe med de riktige tingene
    - Slippe å bruke unødvendig tid

- *Hva tenker du er formålet med Sprik?*
    - Å fjerne gapet mellom saksbehandlere og utviklingsteam
        - Gapet = de som ikke er i Slack, ikke alle tør å poste i Slack (fører til lite kontakt)
    - Få flere informerte saksbehandlere

- *ukategorisert*
    - en ting som kunne vært kult hvis vi skal jobbe med målinger, kunne vært kult med temperaturmålinger for saksbehandling (hvordan trives du med å jobbe i speil, får du hjelp når du trenger det, hvordan har du det, hvordan er motivasjonen, målt over tid for å påvirke prouktet)
        - hvordan gjøres: brukt en vanlig helsesjekk i starten for å sjekke om de vil bruke denne, evt. spesiallaget noe i speil der det kommer en boble i speil eksempelvis hver fredag som tar 30sek å svare på
    - kunne forbedret dagens løsning
        - vanlig spørsmål og svar (q&a forum)
            - hvordan gjør jeg dette og dette
            - løsning: faq side
    - tips
        - intervjue de som ikke er i slack av saksbehandlere (ikke like mye innsikt, mer realistisk brukeropplevelse)
        - rammeverk å tenke på når vi skal arbeide:
            - kjapt å lage → tar lang tid å lage (x akse)
            - lav verdi ^ høy verdi (y akse)
            - lapper med forslag man plasserer på grafen
                - prioriterer kjapt å lage med høy verdi
    - redteam fungerer?
        - funker, men må kanskje gjøres på en annen måte ved ny løsning
        - det de blir tagga i blir oftest løst, men er fortsatt ting som kan forsvinne pga. mengden meldinger
        - ikke alle i redteam er like på, eksempelvis jurister, til å svare på saker

#### Saksbehandlere

##### Saksbehandler #1
- *Hva skal vi kalle hvert element (lapp, feilmelding, feil)?*
    - Innmeldte feil (med parantes på)
- *Hva syntes du om statuslappene?*
    - Likte statuslabelsa
    - Dropdown var veldig intuitivt
- *For å holde oversikt over egne saker, syntes du det funker å bare bruke filtrering for dette? (evt. bruke egne farger for lapper eller labels)*
    - filtrering enten høyere eller venstre side, mer naturlig på venstresiden
    - egne saker → filtrer etter initialer
    - filtrer automatisk etter kronologisk tid, tidligst først
    - egen farger for egne saker kan bli litt mye
- *Hva tenker du om å se feil på denne måten? (oversiktelig?)*
    - Førsteinntrykk er mye, men etterhvert veldig oversiktelig
    - “melde inn feil/funksjonalitetsønsker”-knapper legges høyere
- *Hva er det første du ser?*
    - Mye informasjon, mye tekst, må bruke litt tid for å forstå hva det egt er
    - “Hva er søkefeltet til”-spørsmål

##### Saksbehandler #2
- *Hvordan syntes du det er å jobbe med speil idag?*
    - *Kan du fortelle litt om hvordan du bruker Speil i dag?*
        - Skjønte ikke helt spørsmålet her
    - *Hvordan går du frem når du finner feil i Speil i dag?*
        - Tar kontakt med coacher eller super
        - De melder videre
        - eller kan melde fra i support-kanal på teams

- *Hvordan synes du feilinnmelding angående Speil fungerer i dag?*
    - Slack ble fjernet som forstyrrende element i arbeid
    - mener de fortsatt burde hatt slack, lavere terskel for å melde inn
    - tungvinnt å gå via coacher
    - La kanskje til henne en mening om lang vei??

##### Saksbehandler #3
- *Hvordan syntes du det er å jobbe med speil idag?*
    - *Kan du fortelle litt om hvordan du bruker Speil i dag?*
    - *Hvordan går du frem når du finner feil i Speil i dag?*
        - Går til coach som melder til utvikler
        - Svarer som de gjør fordi hovedproblemet med å jobbe med sykepenger fordi det er for mange som ikke kan sykepenger
            - omfattende domene
            - Noen er raske fordi vi har produksjonstall
            - Lang tid å skaffe domene kunnskap
            - Mange tror de kan sette seg ned og bare gjøre ting, det er mye å sette seg inn i

- *Hvordan synes du feilinnmelding angående Speil fungerer i dag?*
    - Det er så som så
        - tror at utfordringen er at noen enheter er flinke til å bruke faglige ressurser rundt seg, samtidig som andre bruker support rollen
        - Bruker ikke mye tid der, men drukner i repetetive innmeldinger.
        - brukerutbetaling skaper mange feil → større konsekvens
    - Siden det er så komplisert det vi jobber med (sykepenger) → fordi ting gjøres automatisk

##### Saksbehandler #4
- *Hva er det viktigste for deg i en ny løsning for feilinnmelding?*
    - det må være toveiskommunikasjon
    - å melde inn er ikke nok så lenge man ikke får noe respons

##### Saksbehandler #5
- *Hvordan synes du feilinnmelding angående Speil fungerer i dag?*
    - *Er det noe som fungerer godt?*
    - *Er det noe som fungerer mindre godt?*
        - ordinær opplæring innenfor fag og systemer, fungerte ikke fordi ingen har kunnskaper om speil
        - er veldig misfornøyd med oversikten over benken min

### Brukerhistorier og ønsker
| Ønsker | Intervjuobjekt | Prioritet | Brukerhistorie |
| - | - | - | - |
| Kunne se  helt tydelig, uten å grave i diskusjonstråd, hva status og konklusjon er for en sak. | Saksbehandler | | - Jeg vil se behandlingsstatus på en sak <br /> - Jeg ønsker å enkelt kunne finne frem konklusjonen for en lukket sak |
| Ønsker type nyhets feed eller gallery view | Utvikler | | - Jeg vil se en ryddig og organisert visning av innmeldte saker |
| Ryddig oversikt over innmeldte saker | Utvikler | | - Jeg vil se en ryddig og organisert visning av innmeldte saker |
| Voting er bra for å se hva som er aktuelt | Utvikler | | - Jeg vil se hvor aktuell en sak er  |
| Måle “traction” på ulike saker for å fange opp i hvor stor grad en feil skjer. Foreslår et voting system. Hvor trykker skoen i systemet. Fint om utviklere kan sortere etter traction | Utvikler | Største ønske | - Jeg vil se hvor akutell en sak er <br /> - Jeg ønsker å sortere etter hvor aktuell en sak er |
| Se om en sak er rapportert tidligere evt behandlet (unngå gjentakende rapportering) | Saksbehandler | Største ønske | - Jeg vil sjekke om en sak er rapportert inn tidligere <br /> - Jeg vil se behandlingsstatus på en sak |
| Tydelig skille mellom rapporterte feil og feature requests | Utvikler | | - Jeg vil se tydelig skille mellom feature requests for en sak jeg "følger" |
| Bli varslet om aktivitet på en sak/post (diskusjon, status endringer, etc.). Da slipper man å overvåke. | Saksbehandler | | - Jeg vil varsles ved endringer/aktiviteter for en sak jeg "følger" |
| Kunne være i direkte kontakt med utviklere | Saksbehandler | | - Jeg ønsker å ha direkte kontakt med saksbehandler/utvikler |
| Utvikler skal kunne varsle saksbehandler dersom mer informasjon om sak trengs for å løse den. | Saksbehandler | | - Jeg ønsker å ha direkte kontakt med saksbehandler/utvikler |
| Kunne kontakte saksbehandler dersom det trengs for ytterligere info om saken | Utvikler | | - Jeg ønsker å ha idrekte kontakt med saksbehandler/utvikler |
| Kunne søke opp saker på nøkkelord | Saksbehandler | Største ønske | - Jeg ønsker å kunne søke opp saker på nøkkelord og tagger |
| Generere lapper på en sak i Trello | Utvikler | Nice to have | - Jeg ønsker å lage en lapp på en sak i Trello |
| Mulighet til å initiere samtale relatert til posten. Utviklere og saksbehandlre kan ha en dialog som kan organiseres i en tråd festet til en post. | Saksbehandler | | - Jeg ønsker å lese/skrive i diskusjonstråd for en sak |
| Trådsvar | Utvikler | Nice to have | - Jeg ønsker å lese/skrive i diskusjonstråd for en sak |
| Kunne se en diskusjonstråd eller annen aktivtet/varsler rundt en sak. | Saksbehandler | | - Jeg ønsker å lese/skrive i diskusjonstråd for en sak <br /> - Jeg vil varsles ved endringer/aktiviteter for en sak jeg "følger" |
| En sak skal kunne innehold skjermbilder, beskrivelse, aktør-id og dato(er) | Saksbehandler | | - Jeg ønsker å opprette/lese en sak som inneholder tittel, beskrivelse, skjermbilder, datoer, innmelder, feiltype (grensesnitt, handling, logik) og behandlingsstatus |
| Innmelder må være felt på en sak, type feil (grensesnitt, handlingsfeil, verdifeil) | Utvikler | | - Jeg ønsker å opprette/lese en sak som inneholder tittel, beskrivelse, skjermbilder, datoer, innmelder, feiltype (grensesnitt, handling, logik) og behandlingsstatus |
| Feilen kommer lett frem med en beskrivelse og tittel | Utvikler | | - Jeg ønsker å opprette/lese en sak som inneholder tittel, beskrivelse, skjermbilder, datoer, innmelder, feiltype (grensesnitt, handling, logik) og behandlingsstatus |
| Sak burde ha aktørid, mulighet for skjermbilde opplastning, tags, tittel, status. innmelder (saksbehandler) | Utvikler | | - Jeg ønsker å opprette/lese en sak som inneholder tittel, beskrivelse, skjermbilder, datoer, innmelder, feiltype (grensesnitt, handling, logik) og behandlingsstatus |
| Oversikt over hva som støttes i Speil. Funksjonalitetsoversikt (kommunikasjonskanal for ny funksjonalitet i Speil) | Saksbehandler | | - Jeg ønsker å se hvilken funksjonalitet som Speil har |
| Få inntrykk av hvilke features som eksisterer samt. muligheten til å komme med tilbakemelding | Utvikler | Største ønske | - Jeg ønsker å se hvilken ufnksjonalitet som Speil har |
| Se om saken haster å løse | Utvikler | | - Jeg ønsker å se om en sak haster å løse |
| Utviklere skal kunne gi en label til en sak ifht. relatert app | Utvikler | | Jeg ønsker å tildele en sak en emneknagg |
| Kategoriere hvilke typer feil som finnes | Utvikler | Største ønske | - Jeg ønsker å tildele en sak en emneknagg |
| Hashtags/emneknagger|tags for å organisere i type feil -> ser antall feil av en type. Disse kan være egendefinerte | Utvikler | | - Jeg ønsker å tildele en sak en emneknagg <br /> - Jeg ønsker å se antall aktive saker på en emneknagg |
| Ha et "beredskapsteam" (redteam), som svarer raskt | Saksbehandler | REDTEAM | |
| Låse en løst tråd??? | Saksbehandler | | |
| Vurdere en innmeldt sak før den sendes videre til utviklingsteam - for å unngå gjentakende rapportering | Utvikler | |


### Funksjonalitet basert på ønsker og problemløsning (MoSCoW)

| Funksjonalitet | Implementasjonsdetaljer | MoSCoW | Status |
| - | - | - | - |
| Oppdatere innmeldt feil | | Must have (dev) | Done (mangler aktorid) |
| Saksbehandlere skal kunne melde inn saker | • Legge til en god beskrivelse av saken (~ juss) <br /> ◦ Skjermbilder, aktør-id, datoer <br /> ◦ Se en oversikt over meldte saker (egne saker? ~ juss) | Must have (dev) | Done |
| Kunne se innmeldte feil | | Must have (dev) | Done |
| Teamet skal kunne gi beskjed om at saker er løst | | Must have (dev) | Done |
| Enkelt se konklusjon av en sak | | Must have (dev) | Done |
| Søkefunksjonalitet | | Must have (dev) | Done |
| Redigere innmeldt feil | | Should have | Done |
| Filtrering av saker etter type feil og lables | | Should have | Started frontend |
| Gi labels/kategorisering av/til feil | | Should have | Not started |
| Kunne oppdage at noe er meldt inn tidligere | | Could have | Not started |
| Kunne stemme på saker for å måle "hvor skoen trykker i systemet" | | Could have | Not started |
| Trådsvar | | Could have | Not started |
| Oversikt over kjente feil / løsninger | | Could have | Not started |
| Opprette Trello lapper direkte fra appen på en rapportert sak | | Will not have | Not started |
| Formidle støttet funksjonalitet i Speil | | Will not have | Not started |
| Komme med tilbakemelding på støttet funksjonalitet i Speil | | Will not have | Not started |
| FAQ side om Speil | | Will not have | Not started |
| Sortering av saker etter traction | | Will not have | Not started |
| Ved jobbing med målinger hadde det vært kult med temperaturmålings for saksbehandling (spørsmål rundt trivsel målt over tid for å påvirke produktet) | | Will not have | Not started |
| Direkte kontakt mellom de to partene | | Must have (prod) | Not started |

## Juss & ROS

Hensyn å ta:
- Hvem har tjenstlig behov for å se innmeldte feil?
    - Tilgangskontroll
    - Logging og sporing
    - Skal alle kunne se alle felter av innmeldte feil?
    - Skal kun RedTeam se saker? 
- Personvernhensyn
    - Akørid må nesten med både for å kunne sjekke en sak, men også for å logge hvordan en brukers info er behandlet
    - Ha info-bokser for å minne på at personopplysninger ikke skal deles
        - Kan ha en pop-up som kommer når man trykker "meld inn sak" som ber innmelder dobbeltsjekke personopplysninger
    - Deling av personopplysninger i skjermbilde?
    - Færre muligheter for å skrive fritekst kan redusere sannsynligheten for å dele for mye, men kan bli vanskelig med standard kategorier som er dekkende
    - Spesielle hensyn å ta ang. kode 6 og 7?

> ROS er påbegynt og registert i TryggNok 

## Design
- Applikasjonen er skissert i Figma. 
    - Figma prosjektet finner du [her](https://www.figma.com/files/810213623608415105/team/1256163063148444981).
- Underveis i designprosessen har UX/UI-Designer i PO-Helse gitt råd. 
- Prototypen er raffinert gjennom flere iterasjoner med brukerintervjuer av fagfolk, utviklere og saksbehandlere. 
- Prototypen bygges på designsystemet Aksel sine tokens og komponenter.