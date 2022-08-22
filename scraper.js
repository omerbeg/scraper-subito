async function scrapeLastPageNumber(url, page, cheerio) {
    console.log(url);
    await page.goto(url.href);
    const html = await page.content();
    const $ = cheerio.load(html);

    const paginations = $("div.container > div.items > nav").map(
        (index,element) => {
            let pageNumber= $(element).find("div.unselected-page > a > button > span").text();
            console.log(pageNumber);
            return pageNumber;
        }
     ).get();
    
    console.log(paginations);
    pageNumbersString = paginations[0].split("…");

    console.log(pageNumbersString[1]);
    return pageNumbersString[1];
}

async function getAllPagesForCategory (categoryUrl, lastPageNumer) {
    const pagedListingUrls = [];
    for (var i = 1; i<=lastPageNumer; i++) {
        const newUrl = categoryUrl + "?o="+i;        
        //console.log(newUrl);
        pagedListingUrls.push(newUrl);
    }
    return pagedListingUrls;
}






module.exports = {scrapeLastPageNumber, getAllPagesForCategory };