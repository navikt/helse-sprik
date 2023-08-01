DROP TABLE feilmelding;

CREATE TABLE feilmelding (
    id SERIAL PRIMARY KEY ,
    tittel VARCHAR NOT NULL,
    beskrivelse VARCHAR NOT NULL,
    dato TIMESTAMP NOT NULL,
    arbeidsstatus SMALLINT NOT NULL DEFAULT 0,
    haster BOOLEAN NOT NULL DEFAULT false
);