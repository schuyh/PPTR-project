// 1)  retrieve, evaluate, and log recent EAGLE: CALGARY postings
// 2)  retrieve, evaluate, and log recent EAGLE: EDMONTON postings
// 3)  retrive, evaluate, and log recent SI SYSTEM postings
// 4a) send "new results" to schuy@...net via nodemailer and AWS SES, or
// 4b) send "no results" to schuy@...net via nodemailer and AWS SES

const puppeteer = require('puppeteer')
let document = 'msgContent.html'
let logCount = 0

before(async function() {
    console.log("<hr /><h1 style='font-size:2.5em;text-align:center;'><br />Recent Job Postings</h1>")
})

beforeEach(async function() {
    browser = await puppeteer.launch({
        headless: true,
        slowMo: 0,
        devtools: false
        })

    const context = await browser.createIncognitoBrowserContext()
    page = await context.newPage()
})

afterEach(async function() { 
    await browser.close() 
    console.log("\n \n")
})

describe('<br /><br /><hr /><h2 style="font-size:1.5em;">New Eagle Postings: Calgary</h1><hr />', () => {
    let baseURL = 'https://www.eagleonline.com'
    let searchCrit = '/jobs?sort_type=relevance&radius_location=5913490&submit=Search'
    let titles
    let links
    let places 
    let timeInfo, timeValue, timeUnit 
    let aboutCase 

    it('<sub style="visibility:hidden;">should retrieve, evaluate, and return a list of recent postings</sub><br />', async function() {

        // Navigate to baseURL + searchCrit
        await page.goto(baseURL + searchCrit)
        
        // Create arrays of post details
        await page.waitForSelector('.job-details')
        const titles = await page.evaluate(() => Array.from(document.getElementsByClassName('job-title'), e => e.innerText))
        const links = await page.evaluate(() => Array.from(document.getElementsByClassName('job-apply-now-link'), e => e.innerHTML))
        const places = await page.evaluate(() => Array.from(document.getElementsByClassName('results-job-location'), e => e.innerText))
        const timeInfo = await page.evaluate(() => Array.from(document.getElementsByClassName('results-posted-at'), e => e.innerText))

        // Extract time details from each post in timeInfo array
        // Evaluate time details of each post
        // If a post was published no more than 24 hrs ago, log it

        for (i = 0; i < timeInfo.length ; i++) {

            // Extract Value and Unit from timeInfo
            let timeValue = parseInt(timeInfo[i].split(" ")[1])
            let timeUnit = timeInfo[i].split(" ")[2]
            let aboutCase = timeInfo[i].split(" ")[3]
            
            // Evaluate postings based on timeValue and timeUnit
            // If timeValue is equal to or lesser than X and timeValue is (day/hour/hours/minutes)
            // Log the post's title, timeInfo, and baseURL + link to the console
            // > TODO: send the post's details to schuy@...net

            if (timeValue == "1" && timeUnit == "day" || timeValue <= "24" && timeUnit == "hours" || timeValue == "1" && timeUnit == "hour" || timeValue <= "60" && timeUnit == "minutes" || timeValue <= "1" && timeUnit == "minute") {
                console.log("<h3><a style='font-size:1em;color:#2a2a45;' href='" + baseURL + links[i].slice(10, -21) + "'>" + titles[i] + "</a></h2>")
                console.log("<sup>* Posted: " + timeValue + " " + timeUnit + " ago | Location: " + places[i] + "</sup><br /><br />")
                logCount ++
            }
            
                // Posts that are minutes or days old are published as 
                // "Posted about timeValue timeUnit ago"
                // Instead of the regular 
                // "Posted timeValue timeUnit ago"
                // So special cases (using aboutCase) are required
            
            else if (parseInt(timeUnit) == "1" && aboutCase == "hour" || parseInt(timeUnit) <= "24" && aboutCase == "hours") {
                console.log("<h3><a style='font-size:1em;color:#2a2a45;' href='" + baseURL + links[i].slice(10, -21) + "'>" + titles[i] + "</a></h2>")
                console.log("<sup>* Posted: " + timeUnit + " " + aboutCase + " ago | Location: " + places[i] + "</sup><br /><br />")
                logCount ++

            } else if (parseInt(timeUnit) == "1" && aboutCase == "minute" || parseInt(timeUnit) <= "60" && aboutCase == "minutes") {
                console.log("<h3><a style='font-size:1em;color:#2a2a45;' href='" + baseURL + links[i].slice(10, -21) + "'>" + titles[i] + "</a></h2>")
                console.log("<sup>* Posted: " + timeUnit + " " + aboutCase + " ago | Location: " + places[i] + "</sup><br /><br />")
                logCount ++
            } 
            
            /* Monday: 

            else if (timeValue <= "3" && timeUnit == "days"){
                console.log("<h3><a style='font-size:1em;color:#2a2a45;' href='" + baseURL + links[i].slice(10, -21) + "'>" + titles[i] + "</a></h2>")
                console.log("<sup>* Posted: " + timeValue + " " + timeUnit + " ago | Location: " + places[i] + "</sup><br /><br />")
                logCount ++
            } //*/
        }
    })
}) 

describe('<br /><br /><hr /><h2 style="font-size:1.5em;">New Eagle Postings: Edmonton</h1><hr />', () => {
    let baseURL = 'https://www.eagleonline.com'
    let searchCrit = '/jobs?sort_type=relevance&radius_location=5946768&submit=Search'
    let titles
    let links
    let places 
    let timeInfo, timeValue, timeUnit 
    let aboutCase

    it('<sub style="visibility:hidden;">should retrieve, evaluate, and return a list of recent postings</sub><br />', async function() {

        // Navigate to baseURL + searchCrit
        await page.goto(baseURL + searchCrit)
        
        // Create arrays of post details
        await page.waitForSelector('.job-details')
        const titles = await page.evaluate(() => Array.from(document.getElementsByClassName('job-title'), e => e.innerText))
        const links = await page.evaluate(() => Array.from(document.getElementsByClassName('job-apply-now-link'), e => e.innerHTML))
        const places = await page.evaluate(() => Array.from(document.getElementsByClassName('results-job-location'), e => e.innerText))
        const timeInfo = await page.evaluate(() => Array.from(document.getElementsByClassName('results-posted-at'), e => e.innerText))

        // Extract time details from each post in timeInfo array
        // Evaluate time details of each post
        // If a post was published no more than 24 hrs ago, log it

        for (i = 0; i < timeInfo.length ; i++) {

            // Extract Value and Unit from timeInfo
            let timeValue = parseInt(timeInfo[i].split(" ")[1])
            let timeUnit = timeInfo[i].split(" ")[2]
            let aboutCase = timeInfo[i].split(" ")[3] 
            
            // Evaluate postings based on timeValue and timeUnit
            // If timeValue is equal to or lesser than X and timeValue is (day/hour/hours/minutes)
            // Log the post's title, timeInfo, and baseURL + link to the console
            // > TODO: send the post's details to schuy@...net

            if (timeValue == "1" && timeUnit == "day" || timeValue <= "24" && timeUnit == "hours" || timeValue == "1" && timeUnit == "hour" || timeValue <= "60" && timeUnit == "minutes" || timeValue <= "1" && timeUnit == "minute") {
                console.log("<h3><a style='font-size:1em;color:#2a2a45;' href='" + baseURL + links[i].slice(10, -21) + "'>" + titles[i] + "</a></h2>")
                console.log("<sup>* Posted: " + timeValue + " " + timeUnit + " ago | Location: " + places[i] + "</sup><br /><br />")
                logCount ++
            } 

                // Posts that are minutes or days old are published as 
                // "Posted about timeValue timeUnit ago"
                // Instead of the regular 
                // "Posted timeValue timeUnit ago"
                // So special cases (using aboutCase) are required

            else if (parseInt(timeUnit) == "1" && aboutCase == "hour" || parseInt(timeUnit) <= "24" && aboutCase == "hours") {
                console.log("<h3><a style='font-size:1em;color:#2a2a45;' href='" + baseURL + links[i].slice(10, -21) + "'>" + titles[i] + "</a></h2>")
                console.log("<sup>* Posted: " + timeUnit + " " + aboutCase + " ago | Location: " + places[i] + "</sup><br /><br />")
                logCount ++

            } else if (parseInt(timeUnit) == "1" && aboutCase == "minute" || parseInt(timeUnit) <= "60" && aboutCase == "minutes") {
                console.log("<h3><a style='font-size:1em;color:#2a2a45;' href='" + baseURL + links[i].slice(10, -21) + "'>" + titles[i] + "</a></h2>")
                console.log("<sup>* Posted: " + timeUnit + " " + aboutCase + " ago | Location: " + places[i] + "</sup><br /><br />")
                logCount ++
            }
            
            /* Monday: 

            else if (timeValue <= "3" && timeUnit == "days"){
                console.log("<h3><a style='font-size:1em;color:#2a2a45;' href='" + baseURL + links[i].slice(10, -21) + "'>" + titles[i] + "</a></h2>")
                console.log("<sup>* Posted: " + timeValue + " " + timeUnit + " ago | Location: " + places[i] + "</sup><br /><br />")
                logCount ++
            } //*/
        }
    })
})

describe('<br /><br /><hr /><h2 style="font-size:1.5em;">New SI Systems Postings</h1><hr />', () => {
    
    let baseURL = 'https://www.sisystems.com'
    let searchCrit = '/en-ca/search-jobs/?location=1,2,3,6&expertise=6,8,65'
    let postings
    let titles, title
    let links, link
    let timeInfo, timeUnit, timeValue

    it('<sub style="visibility:hidden;">should retrieve, evaluate, and return a list of recent postings</sub><br />', async function() {
        
        // Navigate to baseURL + searchCrit
        await page.goto(baseURL + searchCrit)
        
        // Create array of postings from which to extract time details

        await page.waitForSelector('.listContantHolderRight')
        const postings = await page.evaluate(() => Array.from(document.getElementsByClassName('listContantHolderRight'), e => e.innerText))

        // Create arrays of post titles, links
        const titles = await page.evaluate(() => Array.from(document.getElementsByTagName('h2'), e => e.innerText))
        const links = await page.evaluate(() => Array.from(document.getElementsByTagName('h2'), e => e.innerHTML))

        // Extract time details from each post in postings array
        // Evaluate time details from each post in postings
        // If a post meets the criteria, log it to the console

        for (i = 0; i < postings.length ; i++) {

            // Extract timeInfo from postings
            let timeInfo = postings[i].split(" ")

            // Extract Value and Unit from timeInfo
            let timeValue = parseInt(timeInfo[0])
            let timeUnit = timeInfo[1]

            // Evaluate postings based on timeValue and timeUnit
            // If timeValue is equal to or lesser than X and timeValue is (day/hour/hours/minutes)
            // Log the post's title, timeInfo, and baseURL + link to the console
            // > TODO: send the post's details to schuy@...net

            if (timeValue == "1" && timeUnit == "day" || timeValue <= "24" && timeUnit == "hours" || timeValue == "1" && timeUnit == "hour" || timeValue <= "60" && timeUnit == "minutes" || timeValue <= "1" && timeUnit == "minute"){
            
                // Test: log details to the console
                let title = titles[i].slice(0, 80) + "..."
                let link = baseURL + links[i].split(" ")[1].slice(6,-1)

                console.log("<h3><a style='font-size:1em;color:#2a2a45;' href='" + link + "'>" + title + "</a></h2>")
                console.log("<sup>* Posted: " + timeValue + " " + timeUnit + " ago" + "</sup><br /><br />")
                logCount ++
            } 
            
            /* Monday: 
            
            else if (timeValue <= "3" && timeUnit == "days"){
                let title = titles[i].slice(0, 80) + "..."
                let link = baseURL + links[i].split(" ")[1].slice(6,-1)

                console.log("<h3><a style='font-size:1em;color:#2a2a45;' href='" + link + "'>" + title + "</a></h2>")
                console.log("<sup>* Posted: " + timeValue + " " + timeUnit + " ago" + "</sup><br /><br />")
                logCount ++
            } //*/
        }
    })
})

// nodemailer implementation

require("dotenv").config();
const nodemailer = require("nodemailer");
const smtpEndpoint = "email-smtp.ca-central-1.amazonaws.com";
const smtpUsername = process.env.AWS_SES_ACCESS_KEY_ID;
const smtpPassword = process.env.AWS_SES_SECRET_ACCESS_KEY;
const port = 587;
const senderAddress = "Schuy H <schuy@schuylines.net>";
const toAddresses = 'schuy@schuylines.net';

// send postings via nodemailer and AWS SES
describe('<br /><br /><hr /><h2 style="font-size:1.5em;color:#2a2a2a">Send Results via Nodemailer and AWS SES</h2><hr />', () => {

    it('<sub style="visibility:hidden;">should send msgContent.html to schuy@...net</sub><br />', async function() {

        // Allow time for msgContent.html to populate 
        await page.waitForTimeout(15000);
        
        // Convert logCount to Int for "if/else if" statement
        let logInt = parseInt(logCount);
        console.log("logCount: " + logCount);
        console.log("  |  logInt: " + logInt + "<br /><br />");
        
        // Compose the "new postings" email; or... 
        if (logInt >= "1"){ 

            // The subject line of the email
            var subject = "jobSearch.js: " + logCount + " New Posting(s) Available";

            // The email body for recipients with non-HTML email clients.
            var body_text = `jobSearch.js results:
            ---------------------------------
            There are ` + logCount + ` new job postings available.
            `;

            // The body of the email for recipients whose email clients support HTML content.
            var body_html = `<html>
            <head></head>
            <body>
            <h3>jobSearch.js results:</h3>
            <p>There are ` + logCount + ` new job postings available.</p>
            </body>
            </html>`;
        
        // ...compose the "no postings" email.
        } else if (logInt == "0"){

            // The subject line of the email
            var subject = "jobSearch.js: No (" + logCount + ") Postings Available";

            // The email body for recipients with non-HTML email clients.
            var body_text = `jobSearch.js results:
            ---------------------------------
            There are no (` + logCount + `) new job postings available.
            `;

            // The body of the email for recipients whose email clients support HTML content.
            var body_html = `<html>
            <head></head>
            <body>
            <h3>jobSearch.js results:</h3>
            <p>There are no (` + logCount + `) new job postings available.</p>
            </body>
            </html>`;
        }

        async function main(){

        // Create the SMTP transport.
        let transporter = nodemailer.createTransport({
            host: smtpEndpoint,
            port: port,
            secure: false, // true for 465, false for other ports
            auth: {
            user: smtpUsername,
            pass: smtpPassword
            }
        });

        // Specify the fields in the email.
        let mailOptions = {
            from: senderAddress,
            to: toAddresses,
            subject: subject,
            // cc: ccAddresses,
            // bcc: bccAddresses,
            text: body_text,
            html: body_html,
            attachments: [
                {
                filename: 'msgContent.html',
                path: 'automations/msgContent.html'
                }
            ]
        };

        // Send the email.
        let info = await transporter.sendMail(mailOptions)

        console.log("msgContent.html sent to schuy@...net<br />Message ID: ", info.messageId);
        };

        main().catch(console.error);
    });
});

// npm run jobSearch > ./automations/msgContent.html 

// TODO: schedule script to run 
// >>>>> weekdays at 9, 12, and 3 
// >>>>> update conditions to (3 hours)

// TODO: create separate scripts for 
// >>>>> Monday (3 days), and AM (18 hours)
// >>>>> adjust schedule accordingly 