const { expect } = require('chai')
const puppeteer = require('puppeteer')

describe('Login Test', () => {
    let browser
    let page
    let username
    let password
    let errMsg

    beforeEach(async function() {
        browser = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            headless: false,
            slowMo: 50,
            devtools: false,
        })
        const context = await browser.createIncognitoBrowserContext()
        page = await context.newPage()
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)
    })

    afterEach(async function() {
        await browser.close()
    })

    it('Login Test - Invalid Credentials', async function(){

        let username = 'invalid'
        let password = 'invalid'
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#signin_button')
        await page.click('#signin_button')
        await page.waitForSelector('#login_form')
        await page.type('#user_login', username)
        console.log('Username: ' + username)
        await page.waitForSelector('#user_password')
        await page.type('#user_password', password)
        console.log('Password: ' + password)
        await page.click('#user_remember_me')
        await page.click('input[type="submit"]')
        await page.waitForSelector('.alert-error')
        await page.waitForTimeout('1000')

        // Verify error message is displayed
        const errMsg = await page.$eval('.alert-error', element => element.innerText)
        expect(errMsg).to.include('wrong')
        console.log('Login: Failed')
        console.log('Message: ' + errMsg)
    })
    
    it('Login Test - Valid Credentials', async function() {
        let username = 'username'
        let password = 'password'
        
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#signin_button')
        await page.click('#signin_button')
        await page.waitForSelector('#login_form')
        await page.type('#user_login', username)
        console.log('Username: ' + username)
        await page.waitForSelector('#user_password')
        await page.type('#user_password', password)
        console.log('Password: ' + password)
        await page.click('#user_remember_me')
        await page.click('input[type="submit"]')
        
        // Test fails because of certification warning page

            /* Automated Solution (Failed):
                // Click "Advanced" to reveal hidden "Proceed" button
                    await page.waitForTimeout('1000')
                    await page.waitForSelector('#details-button')
                    await page.click('.secondary-button')
                
                // Click "Proceed" button
                    await page.waitForTimeout('1000')
                    await page.waitForSelector('#proceed-link')
                    await page.click('#proceed-link')
            */
            
        /* Manual Solution:
        Pause the test for 5 seconds to give tester time 
        to manually press "Advanced" and "Proceed" buttons
        await page.waitForTimeout('5000') */
        
        // Issue resolved by setting ignoreHTTPSErrors to true

        // Verify login page is displayed
        await page.waitForSelector('#account_summary_tab')
        await page.waitForTimeout('1000')
        console.log('Login: Successful')
    })
})