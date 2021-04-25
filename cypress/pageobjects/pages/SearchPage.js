import BasePage from '../BasePage'

export default class SearchPage extends BasePage{

    static search(keyword) {
        cy.search(keyword)
    }

    static filterByHousingType(housingtype){
        cy.get('#typeSelect', { timeout: 3000 }).click({force:true})


        for(let i=0; i<housingtype.length; i++)
        {
            if(housingtype[i] == 'Apartments')
            {
                cy.get("label[for='StyleSmall_1']>span:nth-of-type(1)").should('text', 'Apartments ').click({force:true})
            } 
            else if(housingtype[i] == 'Houses')
            {
                cy.get("label[for='StyleSmall_2']>span:nth-of-type(1)").should('text', 'Houses ').click({force:true})
            }
           else if(housingtype[i] == 'Condos')
           {
            cy.get("label[for='StyleSmall_4']>span:nth-of-type(1)").should('text', 'Condos ').click({force:true})
           }
           else if(housingtype[i] == 'Townhomes')
           {
            cy.get("label[for='StyleSmall_16']>span:nth-of-type(1)").should('text', 'Townhomes ').click({force:true})
           }
        }

    
        for(let i=0; i<housingtype.length; i++)
        {
            if(housingtype[i]=='Apartments ')
            {
                let houseslist = cy.get('.for-rent-text').then(items => {
                    expect(houseslist).should('not.exist')
                })
                let condostownhomeslist = cy.get('js-placardTitle title').then(items => {
                    expect(condostownhomeslist).should('not.exist')
                })
            }
            else if (housingtype[i] =='Houses ')
            {
                let houseslist = cy.get('.for-rent-text').then(items => {
                    expect(houseslist).should.contain(housingtype[i])
                 })
            }
            else if (housingtype[i] =='Condos ')
            {
                let condostownhomeslist = cy.get('js-placardTitle title').then(items => {
                    expect(condostownhomeslist).should.contain(housingtype[i])
                })
            }
            else if (housingtype[i] =='Townhomes ')
            {
                let condostownhomeslist = cy.get('js-placardTitle title').then(items => {
                    expect(condostownhomeslist).should.contain(housingtype[i])
                })
            }
        }
       

        cy.get('a[id="typeSelect"]>i.clearIcon').click({force:true})
        cy.wait(5000)
    }

    static filterByPrice(minPrice, maxPrice) {
        cy.get("a[title='Price']", { timeout: 3000 }).click()
        cy.get('#min-input').clear().type(minPrice)
        cy.get('#min-input').type('{enter}')
        cy.get('#max-input').clear().type(maxPrice)
        cy.get('#max-input').type('{enter}')
        //let pricerange = '$'+minPrice.toString().substr(0,1)+'.'+minPrice.toString().substr(1,1)+'k - $'+maxPrice.toString().substr(0,1)+'.'+maxPrice.toString().substr(1,1)+'k'
        let pricerange = '$'+minPrice.toString().substr(0,1)+'.'+minPrice.toString().substr(1,1)+'k+'
        cy.get("a[title='Price']>span:nth-of-type(1)").should('text', pricerange)

        cy.get('.price-range').each(($el, index, $list) => {
            $el=$el.text().toString().replace('$', '')
            $el=$el.toString().replace(',', '')
            $el=$el.toString().replace(' ', '')
            let splitpricearr =$el.split('-')
            let minprice = splitpricearr[0]
            cy.log(minprice)
            expect(Number(minprice)).to.be.within(minPrice, maxPrice)
        })

        cy.get('a[title="Price"]>i.clearIcon').click({force:true})
        cy.wait(5000)
    }

    static filterByBeds(minBed, maxBed){
        cy.get("a[title='Beds']", { timeout: 3000 }).click()
        cy.get(".minBedOptions.active>li[data-value="+minBed+"]").click({force:true})
        cy.get(".cell-xs-6.maxBedsInput.active>div.btn-group.bootstrap-select.max-beds-select>button").click({force:true})
        cy.get(".maxBedOptions.active>li[data-value="+maxBed+"]").click({force:true})

        cy.get('.bed-range').each(($el,index, $list) => {
            $el=$el.text().toString().replace('Studio', '')
            $el=$el.replace('Bed', '')
            $el=$el.replace(' ', '')
            let splitbedarr=$el.split('-')
            let maxbed = splitbedarr[1]
            cy.log(maxbed)
            expect(Number(maxbed)).to.be.within(minBed, maxBed)
        })
        
        cy.get('a[title="Beds"]>i.clearIcon').click({force:true})
        cy.wait(5000)

    }

}