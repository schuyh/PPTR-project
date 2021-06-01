const puppeteer = require('puppeteer')
const { click } = require('../../lib/helpers')
const baseURL = 'https://www.schuylines.net'

describe('Device Emulation', () => {
    let browser
    let page
    const toggle = '#paintbrush'
    const screenshotPath = 'tests/schuylines/screenshots/'
    
    beforeEach(async function() {
        browser = await puppeteer.launch({
            headless: true,
            slowMo: 0,
            devtools: false
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)
    })

    afterEach(async function() {
        await browser.close()
    })
    
    it('Small Mobile Device Test: Portrait', async function() {
        const mobile = puppeteer.devices['iPhone SE']
        await page.emulate(mobile)
        await page.goto(baseURL)
        await page.waitForSelector(toggle)
        await page.waitForTimeout(2500)
        try {
            await page.screenshot({
                path: screenshotPath + 'iPhoneSE-pt-dm.png',
                fullPage: true,
            })
        } catch (error) {
            throw new Error('Could not capture dm screenshot')
        }
        await click(page, toggle)
        await page.waitForTimeout(2500)
        try {
            await page.screenshot({
                path: screenshotPath + 'iPhoneSE-pt-lm.png',
                fullPage: true,
            })
        } catch (error) {
            throw new Error('Could not capture lm screenshot')
        }
    })

    it('Small Mobile Device Test: Landscape', async function() {
        const mobile = puppeteer.devices['iPhone SE landscape']
        await page.emulate(mobile)
        await page.goto(baseURL)
        await page.waitForSelector(toggle)
        await page.waitForTimeout(2500)
        try {
            await page.screenshot({
                path: screenshotPath + 'iPhoneSE-ls-dm.png',
                fullPage: true,
            })
        } catch (error) {
            throw new Error('Could not capture dm screenshot')
        }
        await click(page, toggle)
        await page.waitForTimeout(2500)
        try {
            await page.screenshot({
                path: screenshotPath + 'iPhoneSE-ls-lm.png',
                fullPage: true,
            })
        } catch (error) {
            throw new Error('Could not capture lm screenshot')
        }
    })

    it('Large Mobile Device Test: Portrait', async function() {
        const mobile = puppeteer.devices['iPhone XR']
        await page.emulate(mobile)
        await page.goto(baseURL)
        await page.waitForSelector(toggle)
        await page.waitForTimeout(2500)
        try {
            await page.screenshot({
                path: screenshotPath + 'iPhoneXR-pt-dm.png',
                fullPage: true,
            })
        } catch (error) {
            throw new Error('Could not capture dm screenshot')
        }
        await click(page, toggle)
        await page.waitForTimeout(2500)
        try {
            await page.screenshot({
                path: screenshotPath + 'iPhoneXR-pt-lm.png',
                fullPage: true,
            })
        } catch (error) {
            throw new Error('Could not capture lm screenshot')
        }
    })

    it('Large Mobile Device Test: Landscape', async function() {
        const mobile = puppeteer.devices['iPhone XR landscape']
        await page.emulate(mobile)
        await page.goto(baseURL)
        await page.waitForSelector(toggle)
        await page.waitForTimeout(2500)
        try {
            await page.screenshot({
                path: screenshotPath + 'iPhoneXR-ls-dm.png',
                fullPage: true,
            })
        } catch (error) {
            throw new Error('Could not capture dm screenshot')
        }
        await click(page, toggle)
        await page.waitForTimeout(2500)
        try {
            await page.screenshot({
                path: screenshotPath + 'iPhoneXR-ls-lm.png',
                fullPage: true,
            })
        } catch (error) {
            throw new Error('Could not capture lm screenshot')
        }
    })

    it('Tablet Device Test: Portrait', async function() {
        const tablet = puppeteer.devices['iPad Mini']
        await page.emulate(tablet)
        await page.goto(baseURL)
        await page.waitForSelector(toggle)
        await page.waitForTimeout(2500)
        try {
            await page.screenshot({
                path: screenshotPath + 'iPadMini-pt-dm.png',
                fullPage: true,
            })
        } catch (error) {
            throw new Error('Could not capture dm screenshot')
        }
        await click(page, toggle)
        await page.waitForTimeout(2500)
        try {
            await page.screenshot({
                path: screenshotPath + 'iPadMini-pt-lm.png',
                fullPage: true,
            })
        } catch (error) {
            throw new Error('Could not capture lm screenshot')
        }
    })

    it('Tablet Device Test: Landscape', async function() {
        const tablet = puppeteer.devices['iPad Mini landscape']
        await page.emulate(tablet)
        await page.goto(baseURL)
        await page.waitForSelector(toggle)
        await page.waitForTimeout(2500)
        try {
            await page.screenshot({
                path: screenshotPath + 'iPadMini-ls-dm.png',
                fullPage: true,
            })
        } catch (error) {
            throw new Error('Could not capture dm screenshot')
        }
        await click(page, toggle)
        await page.waitForTimeout(2500)
        try {
            await page.screenshot({
                path: screenshotPath + 'iPadMini-ls-lm.png',
                fullPage: true,
            })
        } catch (error) {
            throw new Error('Could not capture lm screenshot')
        }
    })

    it('Desktop Device Test', async function() {
        await page.setViewport({ width: 1650, height: 1050 })
        await page.goto(baseURL)
        await page.waitForSelector(toggle)
        try {
            await page.waitForTimeout(2500)
            await page.screenshot({
                path: screenshotPath + 'desktop-dm.png',
                fullPage: true,
            })
        } catch (error) {
            throw new Error('Could not capture dm screenshot')
        }
        await click(page, toggle)
        await page.waitForTimeout(2500)
        try {
            await page.screenshot({
                path: screenshotPath + 'desktop-lm.png',
                fullPage: true,
            })
        } catch (error) {
            throw new Error('Could not capture lm screenshot')
        }
    })
})
