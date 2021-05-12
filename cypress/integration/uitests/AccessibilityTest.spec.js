import {url, keyword} from '../../config'
import BasePage from '../../pageobjects/BasePage'
import SearchPage from '../../pageobjects/pages/SearchPage'

describe('Accessibility test', () => {
    it(`Browser: ${Cypress.browser.name} - Homepage Accessibility Test`, () => {
        cy.visit(url)
        cy.injectAxe()
        cy.checkA11y();
    })

    it(`Browser: ${Cypress.browser.name} - Search Filter Accessibility Test`, () => {
        SearchPage.search(keyword)
        cy.wait(3000)
        cy.injectAxe()
        cy.checkA11y();
    })

})