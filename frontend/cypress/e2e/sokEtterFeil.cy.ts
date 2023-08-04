describe('Sjekker søkefunksjonalitet', () => {
   context('Loader landingsside i riktig dimensjon', () => {
     beforeEach(() => {
       cy.viewport(1920, 1080)
       cy.visit('http://localhost:5173/')
     })

    it('sjekker axe', () => {
      cy.checkPageA11y()
    })

     it('Klarer å søke etter en spesifik feil: "Mangel på hensyn til tariffoppgjør"', () => {
      cy.getByTestId('soke-inputfelt').type('Man')
    })
   })
})