// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import {keyword} from '../config'
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'

addMatchImageSnapshotCommand()

Cypress.Commands.add('isVisible', selector => {
    cy.get(selector).should('be.visible')
})

Cypress.Commands.add('isHidden', selector => {
    cy.get(selector).should('not.exist')
})

Cypress.Commands.add('setResolution', size => {
    if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1])
    }
    else {
        cy.viewport(size)
    }
})

Cypress.Commands.add('search', (keyword) => {
    cy.get('#quickSearchLookup').should('be.visible')
    cy.get('#quickSearchLookup').type(keyword)
    let autosuggestion = cy.get('.item>.matchText').then(items => {
        if(autosuggestion == keyword)
        {
            autosuggestion.click()
        }
    })
    cy.get('.go').click()
    cy.wait(5000)
    cy.get('title').should('have.text', ` Apartments for Rent in ${keyword.split(',').join('')} | Apartments.com`)
})

