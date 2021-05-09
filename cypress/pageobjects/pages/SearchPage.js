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
        cy.get('a[id="typeSelect"]>i.clearIcon', {timeout: 3000}).should('have.attr','style','display: none;')
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
        cy.get('a[title="Price"]>i.clearIcon', {timeout: 3000}).should('have.attr','style','display: none;')
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
        cy.get('a[title="Beds"]>i.clearIcon', {timeout: 3000}).should('have.attr','style','display: none;')

    }

    static filterByMoveInDate() {
        //Move in first of next month or two months from now
        cy.get("a[title='moveInDate']>span>i.storyicon.down2StoryIcon").click()
        cy.wait(5000)
        cy.xpath(".//div[@class='datepicker dropdown-menu inline active']/div[@class='datepicker-days' and @style='display: block;']/table/thead/tr[1]/th[@class='next']").click()
        cy.xpath(".//div[@id='datepickerSearch' and @class='active']//tbody/tr[1]/td[@class='day ' and contains(text(), '1')]").click()
        let d = new Date();
        let nextmonthnum = d.getMonth() + 1
        cy.log(nextmonthnum)
        let m_names = ['January', 'February', 'March', 
               'April', 'May', 'June', 'July', 
               'August', 'September', 'October', 'November', 'December'];
        let m_names_short = ['Jan', 'Feb', 'Mar', 
               'Apr', 'May', 'Jun', 'Jul', 
               'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        let nextmonth = m_names[nextmonthnum]
        let nextmonthshort = m_names_short[nextmonthnum]
        cy.log(nextmonthshort)
        let year = d.getFullYear()
        cy.log(year)
        let nextmonthdate = nextmonth+" "+year
        cy.log(nextmonthdate)
        cy.xpath(".//div[@id='datepickerSearch']//table/thead/tr/th[contains(text(), '" + nextmonthdate + "')]").click()
        cy.get(".availability").each(($el, index, $list) => {
            let available = $el.text()
            expect(available).to.include("Avail.")
        })
        cy.get(".availability").each(($el, index, $list) => {
            let available = $el.text()
            expect(available).to.include("Avail.")
        })
        cy.get("a[title='moveInDate']>i.clearIcon").click({force:true})
        cy.get("a[title='moveInDate']>i.clearIcon", {timeout: 3000})
        .should('have.attr', 'style', 'display: none;')

    }

    static filterByLifeStyle(lifestyle) {
        cy.get("#lifestyleSelect").click({force:true})
        cy.get("input[type='radio'][name='lifestyle-select']").each(($el, index, $list) => {
          
            if(index===0)
            {
                cy.contains('Student ')
            }
            else if (index===1)
            {
                cy.contains('Senior Housing ')
            }
            else if (index===2)
            {
                cy.contains('Short Term ')
            }
            else if (index===3)
            {
                cy.contains('Military Housing ')
            }
            else if (index===4)
            {
                cy.contains('Corporate Housing ')
            }
        })

        cy.get("input[id='"+lifestyle+"']").click({force:true}).then(($lifestyle) =>{
            cy.get(".checkAvailability.btn", {timeout: 5000}).should('be.visible')
            cy.wait(5000) // need hard wait because explicit wait didn't wait long enough
            cy.get(".count[id=mapResultBox]", {timeout: 3000}).should('be.visible').then(($result) => {
               let str = ''
               str = $result.text()
               str=str.replace(',','')
               if(lifestyle==='Student Housing')
               {
                str = str.replace(' Student Apartments Available', '')
               }
               else if(lifestyle==='Senior Housing')
               {
                str = str.replace(' Senior Apartments Available', '')
               }
               else if(lifestyle==='Short Term')
               {
                str = str.replace(' Short Term Rentals', '')
               }
               else if(lifestyle==='Military Housing')
               {
                str = str.replace(' Military Apartments Available', '')
               }
               else if(lifestyle==='Corporate Housing')
               {
                str = str.replace(' Corporate Apartments Available', '')
               }
 
               cy.log(str)
               cy.get(".property-information>.property-link>.property-title>.js-placardTitle.title").then(($el) => {
                    cy.contains('Senior')
                    cy.get(".property-title").should('have.length', str)
                })
            })
        })
       

    }
}