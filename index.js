const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const xml2js = require ("xml2js");
const ObjectsToCsv = require("objects-to-csv");
const { Command } = require('commander');
const program = new Command();

const scraper = require("./scraper.js");

program
    .name("index")
    .description("Get all Listings from a dedicated category URL of KlikDoOglasa.com")
    .version('0.0.1');

program.requiredOption('-u, --url <url>', "url to category");
program.requiredOption('-p, --pages <pages>',"how much pages of category to scrape")
program.addHelpText('after', `

Usage: index -u <url>`);
    
program.parse(process.argv);

async function sleep(miliseconds) {
    return new Promise(resolve => setTimeout(resolve, miliseconds));
}

async function createXmlListings(listings) {
    console.log(listings);
    const builder = new xml2js.Builder(
        {
            headless: true,
            allowSurrogateChars: true,
            rootName: 'listing',
            cdata: true
           }
    );
    const xmlListings = builder.buildObject(listings);
   
    console.log(xmlListings);
    
}

async function scrapeListingsTitleUrl(listingsPageUrl, page) {

    await page.goto(listingsPageUrl);

    const html = await page.content();
    const $ = cheerio.load(html);
    
    const listings = $("div.container > div:nth-child(2) > div > div:nth-child(2) > div > div")
        .map((index, element) => {
            let adsTitle = $(element).find("a > div > div > div > div > h2").text();
            let adsUrl = $(element).find("a").attr("href");
            let adsPrice = $(element).find("a > div > div > div > div > p").text(); 
            let adsTime = $(element).find("a > div > div > div > div > div > div > span:nth-child(3)").text();
            return { 'adsTitle': adsTitle, 'adsUrl':  adsUrl, 'adsPrice': adsPrice, 'adsTime': adsTime };
        })
        .get();

    //console.log(listings);

    return listings;

};



async function main() {
    
    const options = program.opts();

    if (options.url) {
        console.log("URL:"+ `${options.url}`);
        
        const browser = await puppeteer.launch({  args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true });
        const page = await browser.newPage();
        const categoryUrl = options.url;
        const lastPageNumer = options.pages;
        const pagedListingUrls = await scraper.getAllPagesForCategory(categoryUrl, lastPageNumer)
        //console.log(pagedListingUrls);
        
        for (var i = 0; i < Object.keys(pagedListingUrls).length; i++) {
            // break if page number equals the pagination page
            if (options.pages) {
                if (options.pages==i) { 
                        break;
                    }
            } else {
               // console.log ("PAGE:" + options.page);
            } 
            console.log("Scraping listings and url from page: " + pagedListingUrls[i] +"\n");
            const listings = await scrapeListingsTitleUrl(pagedListingUrls[i], page);
            listings.forEach((listing, index) => {
                if (typeof(listing.adsUrl) != "undefined" && listing.adsTitle.length>0) {
                    console.log(
                        "Titel:" + listing.adsTitle + "\n" +
                        "Link :" + listing.adsUrl   + "\n" +
                        "Price:" + listing.adsPrice + "   " + "Zeit:" + listing.adsTime +"\n" 
                    );
                }
            });
        };
        // end
        await browser.close();
    } else {
        console.log(options);
    }
}
main();