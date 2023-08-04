const fyllFeilmeldingInputs = () => {
    cy.getByTestId('tittel-inputfelt').type('Cypress-test Tittel')
    cy.getByTestId('beskrivelse-inputfelt').type('Cypress-test Beskrivelse')
    cy.getByTestId('switch-toggle').click()
}

describe('Klarer å melde inn feil', () => {
    context('Fyller ut felt, melder inn og går tilbake til hovedside', () => {
      beforeEach(() => {
          cy.viewport(1920, 1080)
          cy.visit('http://localhost:5173/')
      })

      it('sjekker axe', () => {
        cy.checkPageA11y()
      })
  
      it('Fyller ut felt og melder inn feil som haster', () => {
        cy.contains('Meld inn feil').click()

        fyllFeilmeldingInputs()

        cy.contains('Meld inn feil').click()
      })
    })
})