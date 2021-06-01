const puppeteer = require('puppeteer')
const expect = require('chai').expect

describe('Feedback Test', () => {
    let browser
    let page
    const baseURL = 'http://zero.webappsecurity.com/index.html'

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

    it('Navigate to Feedback Form', async function() {
        await page.goto(baseURL)
        await page.waitForSelector('#feedback')
        await page.click('#feedback')
    })

    it('Submit Empty Feedback Form', async function() {
        await page.waitForSelector('form')
        await page.click('input[type="submit"]', { delay: 10 })
        const url = await page.url()
        expect(url).to.include('/feedback.html')
        await page.waitForTimeout('1000')
    })

    it('Submit Completed Feedback Form', async function() {
        await page.waitForSelector('form')
        await page.type('#name', 'Name')
        await page.type('#email', 'test@email.com')
        await page.type('#subject', 'Subject')
        await page.type('#comment', 'Lorem Ipsum')
        await page.click('input[type="submit"]', { delay: 5 })
    })

    it('Display Results Page', async function() {
        await page.waitForSelector('#feedback-title')
        const url = await page.url()
        expect(url).to.include('/sendFeedback.html')
        const successMsg = await page.$eval('.offset3', element => element.innerHTML)
        expect(successMsg).to.include('Name')
        await page.waitForTimeout('1000')
    })
})