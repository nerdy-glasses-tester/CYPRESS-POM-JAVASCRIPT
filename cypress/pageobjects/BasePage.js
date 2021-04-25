export default class BasePage {
    static pause(ms){
        cy.wait(ms)
    }

    static logInfo(message){
        cy.log(message)
    }

    static setANDROIDPhoneMobileViewport() {
        cy.viewport('samsung-s10')
    }

    static setANDROIDTabletMobileViewport() {
        cy.viewport('samsung-note9')
    }

    static setIOSPhoneMobileViewport() {
        cy.viewport('iphone-x')
    }

    static setIOSTabletMobileViewport() {
        cy.viewport('ipad-2')
    }

    static setDesktopViewport() {
        cy.viewport('macbook-13')
    }

    static setLargeDesktopView() {
        cy.viewport(1980, 1080)
    }
}