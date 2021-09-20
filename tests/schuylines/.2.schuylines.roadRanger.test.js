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
        slowMo: 25,
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

describe('Road Ranger', () => {
    
    let posts
    let roadRanger
    let url
    let postTitle
    let postImages

    it('should navigate to the Road Ranger post', async function() {
        // TODO get array of cards, click on (15th from last)
        // get URL, verify that it includes 19/02/06
        
        const posts = await page.evaluate(() => Array.from(document.getElementsByClassName('highlight'), e => e.innerHTML))
        await posts.reverse() 
        const roadRanger = posts[14].slice(22,41)
        expect(roadRanger).to.be.a.string('/2019/02/06/RV.html')
        console.log('href: ' + roadRanger)
        
        await page.goto(baseURL + roadRanger)
        await page.waitForTimeout(2500)

        const url = await page.url()
        console.log(url)
        expect(url).to.include('2019/02/06/RV.html')
    })

    it('should confirm the post title', async function() {
        const postTitle = await getText(page, '.post-header')
        console.log('Post Title: ' + postTitle)
        expect(postTitle).to.be.a('string', 'Road Ranger')
    })

    it('should confirm the post has five images', async function() {
        // await page.goto(baseURL + '2019/02/06/RV.html')

        const postImages = await getCount(page, '.post-image')
        console.log('Number of Images: ' + postImages)
        expect(postImages).to.equal(5)
    })
})
