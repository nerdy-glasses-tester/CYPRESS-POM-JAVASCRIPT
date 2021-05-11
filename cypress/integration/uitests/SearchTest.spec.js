import {url, keyword, housingtype, minPrice, maxPrice, minBed, maxBed, lifestyle} from '../../config'
import BasePage from '../../pageobjects/BasePage'
import SearchPage from '../../pageobjects/pages/SearchPage'

describe('Search for a rental with filters test', () => {
    before(function() {
        SearchPage.search(keyword)
    })
    
    it(`Filter search results by housing type ${housingtype}`, () => {
        BasePage.setDesktopViewport()
        SearchPage.filterByHousingType(housingtype)
    })

    //it.only
    it(`Filter search results by price ${minPrice} - ${maxPrice}`, () => {
        BasePage.setDesktopViewport()
        SearchPage.filterByPrice(minPrice, maxPrice)
    })

    it(`Filter search results by bed ${minBed} - ${maxBed}`, () => {
        BasePage.setDesktopViewport()
        SearchPage.filterByBeds(minBed, maxBed)
    })

    it('Filter by move in date first of next month or two months from now', () => {
        BasePage.setDesktopViewport()
        SearchPage.filterByMoveInDate()
    })

    it(`Filter by Lifestyle by ${lifestyle}`, () => {
        BasePage.setDesktopViewport()
        SearchPage.filterByLifeStyle(lifestyle)
    })

})