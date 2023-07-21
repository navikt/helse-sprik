import { slowCypressDown } from 'cypress-slow-down'

// Notat: Husk å kjør opp frontend før tester

slowCypressDown()   // gjør at testene ikke kjører dritfort

describe('Landingsside loader ordentlig', () => {
  context('Resolution er 1080p', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080)
    })

    it('passes', () => {
      cy.visit('http://localhost:5173/')
    })
  })
})

describe('Klarer å navigere frem og tilbake til/fra "Meld inn feil"-side', () => {
  context('Går til "Meld inn feil"-siden', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080)
    })

    it('passes', () => {
      cy.visit('http://localhost:5173/')

      cy.contains('Meld inn feil').click()
    })
  })

  context('Går tilbake til hovedsiden', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080)
    })

    it('passes', () => {
      cy.visit('http://localhost:5173/nyfeil')
    
      cy.contains('Gå tilbake til hovedmenyen').click()
    })
  })
})