import {url,keyword,bath,amenities} from '../../config'
import BasePage from '../../pageobjects/BasePage'
import SearchPageMoreFilters from '../../pageobjects/pages/SearchPageMoreFilters'

describe('Search for a rental with more filters test', () => {
    before(function() {
        SearchPageMoreFilters.searchmorefilter(keyword)
    })
    
    it(`Browser: ${Cypress.browser.name} - Filter search results by more filter bath ${bath}`, () => {
        BasePage.setDesktopViewport()
        SearchPageMoreFilters.filterMoreByBaths(bath)
    })

    it(`Filter search results by more filter amenities: ${amenities}`, () =>{
        BasePage.setDesktopViewport()
        SearchPageMoreFilters.filterMoreByAmenities(amenities)
        SearchPageMoreFilters.cleanUpFilters()
    })

})