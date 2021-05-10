import BasePage from '../BasePage'

export default class SearchPageMoreFilters extends BasePage{

    static search(keyword) {
        cy.search(keyword)
        cy.get("#advancedFiltersIcon", {timeout: 5000}).should('be.visible').click({force:true})
    }

    static filterMoreByBaths(bath){

        if(bath ==='Any')
        {
            cy.get("#_baths").click({force:true})
        }
        else if(bath === '1+')
        {
            cy.get("#1_baths").click({force:true})
        }
        else if(bath === '2+')
        {
            cy.get("#2_baths").click({force:true})
        }
        else if(bath === '3+')
        {
            cy.get("#3_baths").click({force:true})
        }

        cy.get(".btn.btn-sm.btn-primary.done").click({force:true})

        cy.get(".imageContainer.carousel.slide>.carouselInner>.item.active ", {timeout: 5000}).should('be.visible').first().click({force:true})
        cy.xpath(".//p[@class='rentInfoLabel' and contains(text(), 'Bathrooms')]/following-sibling::p", {timeout: 5000}).should('be.visible').then(($text) => {
                let txt = $text.text()
                txt = txt.replace(" ba", "")
                txt = txt.replace("- ", "")
                let arr = []
                arr = txt.split(' ')
                const bathlower = Math.round(Number(arr[0]))
                const bathupper = Math.round(Number(arr[1]))
                expect(bathlower).to.be.within(Number(1),Number(2))
                expect(bathupper).to.be.greaterThan(Number(1))
                cy.xpath(".//p[@class='rentInfoLabel' and contains(text(), 'Bathrooms')]/following-sibling::p")
                cy.go('back')
                cy.get(".imageContainer.carousel.slide>.carouselInner>.item.active ")
        })



        cy.get("#advancedFiltersIcon>.clearIcon",{timeout: 3000}).should('be.visible').click({force:true})
        cy.get(".btn.btn-sm.btn-primary.done",{timeout: 3000}).should('be.visible').click({force:true})
        cy.get("#advancedFiltersIcon>.clearIcon",{timeout: 3000}).should('not.be.visible').should('have.attr', 'style', 'z-index: 10; display: none;')

    }
}