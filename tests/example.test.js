const puppeteer = require('puppeteer')
const expect = require('chai').expect

const { click, getText, getCount, typeText, waitForText, shouldNotExist } = require('../lib/helpers')

// Navigation, Selectors

describe('Refresh Test', () => {
    it('should launch and refresh the browser', async function() {
        const browser = await puppeteer.launch({ 
            headless: true, 
            slowMo: 10, 
            devtools: false, 
        })
        const page = await browser.newPage()
        await page.goto('http://example.com/')
        await page.waitForTimeout(1000)
        await page.waitForSelector('h1')
        await page.reload()
        await page.waitForTimeout(1000)
        await page.waitForSelector('h1')

        console.log('Refresh: Successful')
        await browser.close()
    })
})

describe('Backward Forward Navigation Test', () => {
    it('should navigate back and forth between two pages', async function() {
        const browser = await puppeteer.launch({ 
            headless: true,
            slowMo: 50,
            devtools: false,
        })
        const page = await browser.newPage()
        await page.goto('http://example.com/')
        await page.waitForSelector('h1')
        await page.goto('https://dev.to/')
        await page.waitForSelector('.site-logo')
        await page.goBack()
        await page.waitForSelector('h1')

        console.log('Backward Navigation: Successful')
        await page.goForward()
        await page.waitForSelector('.site-logo')

        console.log('Forward Navigation: Successful')
        await browser.close()
    })
})

// Clicking and Typing

describe('Form Input Test', () => {
    it('should interact with a variety of inputs', async function() {
        const browser = await puppeteer.launch({ 
            headless: false,
            slowMo: 100,
            devtools: false,
        })
        const page = await browser.newPage()
        const message = 'Hello World'

        await page.goto('https://devexpress.github.io/testcafe/example/')
        await page.type('#developer-name', 'Schuy', { delay: 200 })
        await page.click('#tried-test-cafe', { clickCount: 1 })
        await page.waitForTimeout(2000)
        await page.select('#preferred-interface', 'Both')
        await page.waitForTimeout(1000)
        await page.type('#comments', message, {delay: 25 })
        await page.click('#submit-button')
        await page.waitForTimeout(1000)
        await page.waitForSelector('.result-content')
        const text = await page.$eval('.result-content', element => element.textContent)
        const truncatedText = text.slice(0, 17)
        
        console.log('Resulting Text: ' + truncatedText)

        expect(text).to.include('Schuy')
        await browser.close()
    })
})

// Logging and Assertions, Test Hooks

describe('Logging and Assertions Test', () => {
    let browser
    let page
    
    before(async function() {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 100,
            devtools: false,
        })
    })

    after(async function() {
        await browser.close()
    })

    it('should verify the title of the page', async function() {
        // const browser = await puppeteer.launch({
        //     headless: true,
        //     slowMo: 250,
        //     devtools: false,
        // })
        const page = await browser.newPage()
        await page.goto('http://example.com/')
        
        const title = await page.title()
        const url = await page.url()
        // const text = await page.$eval('h1', element => element.textContent)
        const text = await getText(page, 'h1')

        console.log('URL: ' + url)
        console.log('Title: ' + title)

        expect(text).to.be.a('string', 'Example Domain')
        expect(url).to.include('example.com')
        // await browser.close()
    })

    it('should return a count of items in a list', async function() {
        // const browser = await puppeteer.launch({
        //     headless: true,
        //     slowMo: 250,
        //     devtools: false,
        // })
        const page = await browser.newPage()
        await page.goto('http://example.com/')
        // const count = await page.$$eval('p', element => element.length)
        const count = await getCount(page, 'p')

        console.log('Paragraph Count: ' + count)

        expect(count).to.equal(2)
        // await browser.close()
    })
})

// Incognito 

describe('Keyboard Interaction Test', () => {
    let browser
    let page

    beforeEach(async function() {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
            devtools: false,
        })
        const context = await browser.createIncognitoBrowserContext()
        page = await context.newPage()
        await page.goto('http://zero.webappsecurity.com/index.html')
    })

    afterEach(async function() {
        await browser.close() 
    })
    
    it('should accept input of Enter key', async function() {
        // await page.waitForSelector('#searchTerm')
        await typeText(page, '#searchTerm', 'Hello World')
        await page.keyboard.press('Enter', { delay: 10 })
        await page.waitForTimeout(3000)
    })
    
    it('should recognize the sign in button is no longer present', async function () {
        // await page.waitForSelector('#signin_button')
        // await page.click('#signin_button', { delay: 1000 })
        await click(page, '#signin_button')
        // DEP: await page.waitFor(() => !document.querySelector('#signin_button'))
        // await page.waitForSelector('#signin_button', { 
        //     hidden: true, 
        //     timeout: 2000 })
        await shouldNotExist(page, '#signin_button')
    })
})