const { expect } = require('chai')
const puppeteer = require('puppeteer')

describe('Currency Exchange Test', () => {
    let browser
    let page
    let url 
    let message

    before(async function() {
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

    after(async function() {
        await browser.close()
    })

    it('Login', async function() {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.waitForSelector('#signin_button')
        await page.click('#signin_button')
        await page.waitForSelector('#login_form')
        await page.type('#user_login', 'username')
        await page.waitForSelector('#user_password')
        await page.type('#user_password', 'password')
        await page.click('#user_remember_me')
        await page.click('input[type="submit"]')
        
        // Verify correct page is displayed
        await page.waitForSelector('#account_summary_tab')
        await page.waitForTimeout('1000')
    })

    it('Navigate to Currency Exchange Form', async function() {
        await page.waitForSelector('#pay_bills_tab')
        await page.click('#pay_bills_tab')
        // The proposed workaround for accessing the third tab
        // does not seem to work any longer
        // await page.waitForSelector('a#ui-tabs-3')
        // await page.click('a#ui-tabs-3')
        
        // Pause again to access the tab manually
        console.log('MANUAL TEST STEP:')
        console.log('click "Purchase Foreign Currency" tab')
        await page.waitForTimeout('5000')
        await page.waitForSelector('#pc_calculate_costs')
        await page.waitForTimeout('1000')
    })

    it('Exchange Currency', async function() {
        await page.waitForSelector('#pc_currency')
        await page.select('#pc_currency', 'CAD')
        await page.type('#pc_amount', '250')
        await page.click('#pc_inDollars_true')
        await page.click('#purchase_cash', { delay: 10 })
        const message = await page.$eval('#alert_content', element => element.innerHTML)
        expect(message).to.include('success')
        await page.waitForTimeout('1000')
    })
})