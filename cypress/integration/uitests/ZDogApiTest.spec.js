/// <reference types="Cypress" />

describe('Dog API Test with Cypress', () => {
    let vote_id = 0
    it('Get breeds of dogs', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.thedogapi.com/v1/breeds',
            failOnStatusCode: false
        }).then((response) => {
            let body = JSON.parse(JSON.stringify(response.body))
            cy.log(body)
            expect(response.status).to.equal(200)
            expect(body[5]).has.property('name', 'Akita')
            expect(body[5]).has.property('temperament', 'Docile, Alert, Responsive, Dignified, Composed, Friendly, Receptive, Faithful, Courageous')
        })
    })

    it('Post votes', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.thedogapi.com/v1/votes',
            headers: {
                "content-type": "application/json",
                "x-api-key": "ab652995-978e-441c-b84b-992ef4d1e2fe"
            },
            body: {
                "image_id": "asf2",
                "sub_id": "my-user-1234",
                "value": 2
            },
            failOnStatusCode: false
        }).then((response) => {
            let body = JSON.parse(JSON.stringify(response.body))
            cy.log(body)
            expect(response.status).to.equal(200)
            vote_id = response.body.id
        })
    })


    it('Get votes', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.thedogapi.com/v1/votes',
            headers: {
                "x-api-key": "ab652995-978e-441c-b84b-992ef4d1e2fe"
            },
            failOnStatusCode: false
        }).then((response) => {
            let body = JSON.parse(JSON.stringify(response.body))
            cy.log(body)
            expect(response.status).to.equal(200)
        })
    })

    it('Delete vote', () => {
        cy.request({
            method: 'POST',
            url: 'https://api.thedogapi.com/v1/votes',
            headers: {
                "content-type": "application/json",
                "x-api-key": "ab652995-978e-441c-b84b-992ef4d1e2fe"
            },
            body: {
                "image_id": "asf2",
                "sub_id": "my-user-1234",
                "value": 2
            },
            failOnStatusCode: false
        }).then((response) => {
            let body = JSON.parse(JSON.stringify(response.body))
            cy.log(body)
            expect(response.status).to.equal(200)
            vote_id = response.body.id
            cy.log(vote_id)
            cy.request({
                method: 'DELETE',
                url: `https://api.thedogapi.com/v1/votes/${vote_id}`,
                params: {
                    vote_id: `${vote_id}`
                },
                headers: {
                    "content-type": "application/json",
                    "x-api-key": "ab652995-978e-441c-b84b-992ef4d1e2fe"
                },
                failOnStatusCode: false
            }).then((response) => {
                let body = JSON.parse(JSON.stringify(response.body))
                cy.log(body)
                expect(response.status).to.equal(200)
            })
        })
    })
})
    

