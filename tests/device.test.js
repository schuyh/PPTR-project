const puppeteer = require('puppeteer')

describe('Device Emulation', () => {
    let browser
    let page
    const URL = 'https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts'

    before(async function() {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 25,
            devtools: false
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)
    })

    after(async function() {
        await browser.close()
    })

    it('Desktop Device Test', async function() {
        await page.setViewport({ width: 1650, height: 1050 })
        await page.goto(URL)
        await page.waitForTimeout(5000)
    })

    it('Tablet Device Test', async function() {
        const tablet = puppeteer.devices['iPad Mini']
        await page.emulate(tablet)
        await page.goto(URL)
        await page.waitForTimeout(5000)
    })

    it('Tablet Device Rotation Test', async function() {
        const tablet = puppeteer.devices['iPad Mini landscape']
        await page.emulate(tablet)
        await page.goto(URL)
        await page.waitForTimeout(5000)
    })

    it('Large Mobile Device Test', async function() {
        const mobile = puppeteer.devices['iPhone XR']
        await page.emulate(mobile)
        await page.goto(URL)
        await page.waitForTimeout(5000)
    })

    it('Large Mobile Device Rotation Test', async function() {
        const mobile = puppeteer.devices['iPhone XR landscape']
        await page.emulate(mobile)
        await page.goto(URL)
        await page.waitForTimeout(5000)
    })

    it('Small Mobile Device Test', async function() {
        const mobile = puppeteer.devices['iPhone SE']
        await page.emulate(mobile)
        await page.goto(URL)
        await page.waitForTimeout(5000)
    })

    it('Small Mobile Device Rotation Test', async function() {
        const mobile = puppeteer.devices['iPhone SE landscape']
        await page.emulate(mobile)
        await page.goto(URL)
        await page.waitForTimeout(5000)
    })
})
