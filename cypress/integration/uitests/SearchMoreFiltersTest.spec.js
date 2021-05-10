import {url,keyword,bath} from '../../config'
import BasePage from '../../pageobjects/BasePage'
import SearchPage from '../../pageobjects/pages/SearchPage'
import SearchPageMoreFilters from '../../pageobjects/pages/SearchPageMoreFilters'

describe('Search for a rental with more filters test', () => {
    before(function() {
        cy.visit(url)
        SearchPageMoreFilters.search(keyword)
    })
    
    it(`Filter search results by more filter bath ${bath}`, () => {
        BasePage.setDesktopViewport()
        SearchPageMoreFilters.filterMoreByBaths(bath)
    })



})