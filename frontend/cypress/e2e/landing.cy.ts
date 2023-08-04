describe('Landingsside loader ordentlig', () => {
  context('Loader landingsside i riktig dimensjon', () => {
    beforeEach(() => {
      cy.viewport(1920, 1080)
      cy.visit('http://localhost:5173/')
    })

    it('sjekker axe', () => {
      cy.checkPageA11y()
    })

    it('bør loade liste med feil', () => {
      cy.contains('Speil sier NAV må tilbakekreve sykepenger på feil grunnlag')
      cy.contains('Feil A')
      cy.contains('Feil B')
      cy.contains('Feil C')
      cy.contains('Feil D')
      cy.contains('Mangel på hensyn til tariffoppgjør')
    })
  })
})