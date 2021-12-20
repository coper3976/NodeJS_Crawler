const axios = require('axios');
const cheerio = require('cheerio');


const url = async () => {
    try {
        return await axios.get('https://www.kasina.co.kr/goods/populate.php', {
            headers : {
                'user-agent' : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
                'Accept-Charset': 'utf-8'      
            }
        });
    } catch (err) {
        console.log(err);
    }
}

const parsing = async () => {
    const html = await url();
   // const $ = cheerio.load(iconv.decode(html.data,'EUC-KR'));
    const $ = cheerio.load(html.data);
    const div = $('.item_cont');

    div.each((idx, divs) => {
        const brand = $(divs).find('.item_brand').text().trim();
        const productID = $(divs).find('.item_name').text().trim();
        const price = $(divs).find('.item_price').text().trim();

        console.log(brand, "//", productID, "//", price);
    });
}

parsing();


