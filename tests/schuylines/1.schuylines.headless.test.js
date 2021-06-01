const puppeteer = require('puppeteer')
const expect = require('chai').expect
const { getText, getCount, click } = require('../../lib/helpers')
const baseURL = 'https://www.schuylines.net'

let browser
let page

before(async function() {
    browser = await puppeteer.launch({
        headless: true,
        slowMo: 0,
        devtools: false,
    })
    const context = await browser.createIncognitoBrowserContext()
    page = await context.newPage()
    await page.setDefaultTimeout(30000)
    await page.setDefaultNavigationTimeout(60000)
    await page.goto(baseURL)
})

after(async function() {
    await page.waitForTimeout(500)
    await browser.close()
})

describe('Title Test', () => {

    let headerTitle
    let footerTitle 

    it('should verify the header title', async function() {

        const headerTitle = await getText(page, 'h1')
        console.log('Header Title: ' + headerTitle)
        expect(headerTitle).to.be.a('string', 'schuylines')
    })

    it('should verify the footer title', async function() {

        const footerTitle = await getText(page, 'h1.footer')
        console.log('Footer Title: ' + footerTitle)
        expect(footerTitle).to.be.a('string', 'schuylines')
    })
})

describe('Contact Us', () => { 

    let contactUs

    it('should log the href', async function() {
        await page.waitForSelector('#contactUs')
        const contactUs = await page.$eval("a#contactUs", element => element.href)
        console.log('href is: ' + contactUs)
    })

    it('should verify recipient', async function() {
        await page.waitForSelector('#contactUs')
        const contactUs = await page.$eval("a#contactUs", element => element.href)
        expect (contactUs).to.include('mailto:schuy+net@schuylines.net')
        console.log('Recipient is: schuy+net@schuylines.net')
    })

    it('should verify subject line', async function() {
        await page.waitForSelector('#contactUs')
        const contactUs = await page.$eval("a#contactUs", element => element.href)
        expect (contactUs).to.include('?subject=Contact%20Us')
        console.log('Subject is: Contact Us')
    })

    it('should verify message content', async function() {
        await page.waitForSelector('#contactUs')
        const contactUs = await page.$eval("a#contactUs", (elm) => elm.href)
        expect (contactUs).to.include('&body=Hi%20Sky%2C')
        console.log ('Body is: Hi Sky,')
    })
})

describe('Get Post Count', () => {

    let count

    it('should provide a count of current posts', async function() {
        const count = await getCount(page, '.card')
        console.log('Number of Posts: ' + count)
    })
})
