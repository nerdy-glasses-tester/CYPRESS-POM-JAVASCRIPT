import BasePage from '../BasePage'

export default class SearchPageMoreFilters extends BasePage{

    static searchmorefilter(keyword) {
        cy.searchmorefilter(keyword)
    }

    static search(keyword) {
        cy.search(keyword)
        cy.get("#advancedFiltersIcon", {timeout: 5000}).should('be.visible').click({force:true})
    }

    static cleanUpFilters(){

        let size = 0
        size = cy.get("#advancedFiltersIcon>.clearIcon").should('not.have.length', -1)
        if (size > 0)
        {
            cy.get("#advancedFiltersIcon>.clearIcon",{timeout: 3000}).should('be.visible').click({force:true})
            cy.get(".btn.btn-sm.btn-primary.done",{timeout: 3000}).should('be.visible').click({force:true})
            cy.get("#advancedFiltersIcon>.clearIcon",{timeout: 3000}).should('not.be.visible').should('have.attr', 'style', 'z-index: 10; display: none;')
        }

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

        })
        cy.go('back')
        

    }


    static filterMoreByAmenities(amenities){
        let arr = []
        arr = amenities.split(', ')

        cy.get("#advancedFilterUnitAmenities>li>a>fieldset.checkbox>label>span:nth-of-type(1)").each(($el, $index, $list) => {

            for(let i=0; i<arr.length; i++)
            {
                const txt = $el.text()
                if(txt === 'Air Conditioning' && arr[i] === 'Air Conditioning')
                {
                    cy.get($el).click({force:true})
                }
                else if(txt === 'In Unit Washer & Dryer' && arr[i] === 'In Unit Washer & Dryer')
                {
                    cy.get($el).click({force:true})
                }
                else if(txt === 'Washer & Dryer Hookups' && arr[i] === 'Washer & Dryer Hookups')
                {
                    cy.get($el).click({force:true})
                }
                else if(txt === 'Dishwasher' && arr[i] === 'Dishwasher')
                {
                    cy.get($el).click({force:true})
                }
                else if(txt === 'Wheelchair Access' && arr[i] === 'Wheelchair Access')
                {
                    cy.get($el).click({force:true})
                }
                else if(txt === 'Parking' && arr[i] === 'Parking')
                {
                    cy.get($el).click({force:true})
                }
                else if(txt === 'Laundry Facilities' && arr[i] === 'Laundry Facilities')
                {
                    cy.get($el).click({force:true})
                }
                else if(txt === 'Fitness Center' && arr[i] === 'Fitness Center')
                {
                    cy.get($el).click({force:true})
                }
                else if(txt === 'Pool' && arr[i] === 'Pool')
                {
                    cy.get($el).click({force:true})
                }
                else if(txt === 'Elevator' && arr[i] === 'Elevator')
                {
                    cy.get($el).click({force:true})
                }
                else if(txt === 'Doorman' && arr[i] === 'Doorman')
                {
                    cy.get($el).click({force:true})
                }
                else if(txt === 'Dog Friendly' && arr[i] === 'Dog Friendly')
                {
                    cy.get($el).click({force:true})
                }
                else if(txt === 'Cat Friendly' && arr[i] === 'Cat Friendly')
                {
                    cy.get($el).click({force:true})
                }
                else if(txt === 'Furnished' && arr[i] === 'Furnished')
                {
                    cy.get($el).click({force:true})
                }
                else if(txt === 'Lofts' && arr[i] === 'Lofts')
                {
                    cy.get($el).click({force:true})
                }
                else if(txt === 'Utilities Included' && arr[i] === 'Utilities Included')
                {
                    cy.get($el).click({force:true})
                }
            }
        })
            
            //cy.get(".btn.btn-sm.btn-primary.done", {timeout: 5000}).should('be.visible').click({force:true})
            cy.get(".imageContainer.carousel.slide>.carouselInner>.item.active", {timeout: 5000}).should('be.visible').first().click({force:true})

            for(let i=0; i<arr.length; i++)
            {

                if(arr[i] === 'Furnished')
                {
                    cy.get("#amenityGroup1>ul>li").scrollIntoView().then(($el) =>{
                        let amenity = $el.text()
                        if(amenity.contains('Furnished') && arr[i] === 'Furnished')
                        {
                            expect(amenity).to.eq('Furnished Units Available')
                        }
                    })
                }

                if(arr[i] === 'Air Conditioning')
                {
                        let size = 0
                        size = cy.get('body').find(".uniqueFeatures>div>div>div>ul").should('not.have.length', -1)
                        if(size > 0)
                        {
                            cy.get('.uniqueFeatures>div>div>div>ul>li').then(($el, index, $list) => {
                                let amenity = $el.text()
                                if(amenity === 'Air Conditioning' && arr[i] === 'Air Conditioning')
                                {
                                    expect(amenity).to.equal(arr[i])
                                }
                            })
                        }
                    
                        size = cy.get('body').find('#amenityGroup5>ul').should('not.have.length', -1)
                        if(size > 0)
                        {
                            cy.get('#amenityGroup5>ul>li').then(($el, index, $list) => {
                                let amenity = $el.text()
                                if(amenity === 'Air Conditioning' && arr[i] === 'Air Conditioning')
                                {
                                    expect(amenity).to.equal(arr[i])
                                }
                            })
                        }
            
                }
                else if(arr[i] === 'In Unit Washer & Dryer')
                {
                    let size = 0
                    size = cy.get('body').find(".amenityLabel").should('not.have.length', -1)
                    if(size > 0)
                    {
                        cy.get(".amenityLabel").each(($el, index, $list) => {
                            let amenity = $el.text()
                            if(amenity === 'Washer/Dryer - In Unit' && arr[i] === 'In Unit Washer & Dryer')
                            {
                                expect(amenity).to.equal('Washer/Dryer - In Unit')
                            }
                        })
                    }

                    size = cy.get('body').find("#amenityGroup5>ul").should('not.have.length', -1)
                    if(size > 0)
                    {
                        cy.get("#amenityGroup5>ul").scrollIntoView().then(($el) => {

                            cy.get("#amenityGroup5>ul>li").each(($el, $index, $list) => {
                                let amenity = $el.text()
                                if(amenity === 'Washer/Dryer - In Unit' && arr[i] === 'In Unit Washer & Dryer')
                                {
                                    expect(amenity).to.equal('Washer/Dryer - In Unit')
                                }
                            })
                        })
                    }
                }
                else if(arr[i] === 'Wheelchair Access')
                {
                    cy.get("#amenityGroup5>ul>li>span").scrollIntoView().each(($el, $index, $list) => {
                        let amenity = $el.text()
           
                        if(amenity.contains('Wheelchair') && arr[i] === 'Wheelchair Access')
                        {
                            expect(amenity).to.equal('Wheelchair Accessible (Rooms)')
                        }
                    })
                }
                else if (arr[i] === 'Dishwasher')
                {
                    cy.get("#amenityGroup6>ul>li>span").scrollIntoView().each(($el, $index, $list) => {
                        let amenity = $el.text()
                        if(amenity === 'Dishwasher' && arr[i] === 'Dishwasher')
                        {
                            expect(amenity).to.equal('Dishwasher')
                        }
                    })
                }
                else if(arr[i] === 'Parking')
                {                 
                    cy.get("h4.header-column").each(($el, index, $list) => {
                        let text = $el.text()
                        if(text === 'Parking')
                        {
                            expect(text).to.equal('Parking')
                        }
                    })        
                }   
                else if(arr[i] === 'Dog Friendly') 
                {
                    cy.get("h4.header-column").each(($el, index, $list) => {
                        let text = $el.text()
                        if(text === 'Dogs Allowed')
                        {
                            expect(text).to.equal('Dogs Allowed')
                        }
                    })
                }
                else if(arr[i] === 'Cat Friendly')
                {
                    cy.get("h4.header-column").each(($el, index, $list) => {
                        let text = $el.text()
                        if(text === 'Cats Allowed')
                        {
                            expect(text).to.equal('Cats Allowed')
                        }

                    })
                }
                else if(arr[i] === 'Laundry Facilities')
                {
                    cy.get(".combinedAmenitiesList").first().scrollIntoView().then(($section) => {
                        
                        cy.get(".combinedAmenitiesList>li").then(($el, index, $list) => {
                            let amenity = $el.text()
                            if(amenity === 'Laundry Facilities' && arr[i] === 'Laundry Facilities')
                            {
                                expect(amenity).to.eq('Laundry Facilities')
                            }
                        })
                    })
                }
                else if(arr[i] === 'Fitness Center')
                {
                    cy.get(".combinedAmenitiesList").first().scrollIntoView().then(($section) => {
                        
                        cy.get(".combinedAmenitiesList>li").then(($el, index, $list) => {
                            let amenity = $el.text()
                            if(amenity === 'Fitness Center' && arr[i] === 'Fitness Center')
                            {
                                expect(amenity).to.eq('Fitness Center')
                            }
                        })
                    })  
                }
                else if (arr[i] === 'Pool')
                {
                    cy.get(".combinedAmenitiesList").first().scrollIntoView().then(($section) => {
                        
                        cy.get(".combinedAmenitiesList>li").then(($el, index, $list) => {
                            let amenity = $el.text()
                            if(amenity === 'Pool' && arr[i] === 'Pool')
                            {
                                expect(amenity).to.eq('Pool')
                            }
                        })
                    })
                }
                else if (arr[i] === 'Elevator')
                {
                    cy.get(".combinedAmenitiesList").first().scrollIntoView().then(($section) => {
                        
                        cy.get(".combinedAmenitiesList>li").then(($el, index, $list) => {
                            let amenity = $el.text()
                            if(amenity === 'Elevator' && arr[i] === 'Elevator')
                            {
                                expect(amenity).to.eq('Elevator')
                            }
                        })
                    })
                }


            }

            cy.go('back')

    }

    static filterMoreByKeyword(morekeyword){
        cy.get('#keywordInput').type(morekeyword, {force:true})
        cy.get('.btn.btn-sm.btn-primary.done').click({force:true})
        cy.get('.item.active').first().click({force:true})
        cy.get(".subSpec>ul>li.specInfo.uniqueAmenity>span").each(($el, index, $list) => {
            let text = $el.text()
            if(text === morekeyword)
            {
                expect(text).to.be.equal(morekeyword)
            }

        })

        cy.go('back')
    }

    static filterMoreBySqft(minsqft, maxsqft){
        cy.get("button[data-id='minSF']>span.caret").click({force:true})
        cy.get(".text").each(($el, index, $list) => {
            let text = $el.text()
            if(text === minsqft)
            {
                $el.scrollIntoView()
                cy.click({force:true})
            }
        })
        
        cy.get("button[data-id='maxSF']>span.caret").click({force:true})
        cy.get(".text").each(($el, index, $list) => {
            let text = $el.text()
            if(text === maxsqft)
            {
                $el.scrollIntoView()
                cy.click({force:true})
            }
        })
        cy.get('.btn.btn-sm.btn-primary.done').click({force:true})
        cy.get('.item.active').first().click({force:true})
        cy.xpath('.//p[@class="rentInfoLabel" and contains(text(), "Square Feet")]//following-sibling::p[@class="rentInfoDetail"]')
        .scrollIntoView().then(($ela) => {
            let text = $ela.text()
            text = text.replace(' sq ft', '')
            text = text.replace(' ', '')
            text = text.replace(',', '')
            let arr = []
            arr = text.split('-')
            expect(Number(arr[1])).to.be.lessThan(maxsqft+100)
        })
        
        cy.go('back')
    }

}