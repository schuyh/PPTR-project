const { expect } = require('chai')
const puppeteer = require('puppeteer')

describe('Payment Test', () => {
    let browser
    let page
    let url 
    let message

    before(async function() {
        browser = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            headless: false,
            slowMo: 100,
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

    it('Navigate to Payment Form', async function() {
        await page.waitForSelector('#pay_bills_tab')
        await page.click('#pay_bills_tab')
        await page.waitForSelector('#pay_saved_payees')
        await page.waitForTimeout('1000')
    })

    it('Submit Incomplete Payment Information', async function() {
        await page.click('#pay_saved_payees', { delay: 10 })
        const url = await page.url()
        expect(url).to.include('pay-bills.html')
        await page.waitForTimeout('1000')
    })

    it('Complete Payment', async function() {
        await page.select('#sp_payee', 'Apple')
        await page.select('#sp_account', 'Credit Card')
        await page.type('#sp_amount', '250')
        await page.type('#sp_date', '2021-02-11')
        await page.keyboard.press('Enter')
        await page.type('#sp_description', 'Scheduled payment')
        await page.click('#pay_saved_payees', { delay: 10 })
        await page.waitForSelector('#alert_content')
        const url = await page.url()
        expect(url).to.include('pay-bills-saved-payee.html')
        const message = await page.$eval('#alert_content', element => element.innerHTML)
        expect(message).to.include('success')
        await page.waitForTimeout('1000')
    })
})