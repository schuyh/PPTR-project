const puppeteer = require('puppeteer')
const expect = require('chai').expect
const { getText, getCount, click } = require('../../lib/helpers')
const baseURL = 'https://www.schuylines.net'

let browser
let context 
let page

before(async function() {
    browser = await puppeteer.launch({
        headless: true,
        slowMo: 10,
        devtools: false,
    })
    const context = await browser.createIncognitoBrowserContext()
    page = await context.newPage()
    await page.setDefaultTimeout(30000)
    await page.setDefaultNavigationTimeout(60000)
    await page.goto(baseURL)
})

after(async function() {
    await page.waitForTimeout(1000)
    await browser.close()
})

describe('Toggle Dark Mode', () => {

    let defaultToggle
    let toggledOnce
    let toggledTwice

    let truncDefault
    let truncOnce
    let truncTwice

    let toggle = '#paintbrush'

    it('the page should begin in light mode', async function() {
        // Ensure colour scheme begins in light mode
        await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }])
        await page.waitForTimeout(2500)
        console.log('Light mode is selected')

        // Verify and log current toggle colour
        const defaultToggle = await page.$eval(toggle, img => img.src)
        const truncDefault = defaultToggle.slice(51, 56)
        try {
            expect (defaultToggle).to.include('Black')
            console.log('Toggle image is: ' + truncDefault)
        } catch (error) {
            throw new Error('Toggle image is not: ' + truncDefault)
        }
    })

    it('toggle colour should change to dark mode', async function() {
        // Toggle Dark Mode
        try {
            await click(page, toggle)
            await page.waitForTimeout(2500)
            console.log('Dark mode has been selected')
        } catch (error) {
            throw new Error('Toggle could not be clicked')
        }

        // Verify and log current toggle colour 
        const toggledOnce = await page.$eval(toggle, img => img.src)
        const truncOnce = toggledOnce.slice(51, 56)
        try {
            expect (toggledOnce).to.include('White')
            console.log('Toggle image has changed to: ' + truncOnce)
        } catch (error) {
            throw new Error('Toggle image is not: ' + truncOnce)
        }
    })

    it('toggle colour should change to light mode', async function() {
        // Toggle Light Mode 
        try {
            await click(page, toggle)
            await page.waitForTimeout(2500)
            console.log('Light mode has been selected')
        } catch (error) {
            throw new Error('Toggle could not be clicked')
        }

        // Verify and log current toggle colour 
        const toggledTwice = await page.$eval(toggle, img => img.src)
        const truncTwice = toggledTwice.slice(51, 56)
        try {
            expect (toggledTwice).to.include('Black')
            console.log('Toggle image has changed to: ' + truncTwice)
        } catch (error) {
            throw new Error('Toggle image is not: ' + truncTwice)
        }
    })
})
