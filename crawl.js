const axios = require('axios');
const cheerio = require('cheerio');


const url = async () => {
    try {
        return await axios.get('https://www.kasina.co.kr/goods/populate.php', {
            headers : {
                'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
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
        const imgLink = "https://www.kasina.co.kr" + $('#contents > div.sub_content > div.content > div > div.goods_list_cont.goods_content_7 > div > ul > li:nth-child(1) > div > div.item_photo_box > a > img').attr('src');
        const productLink = "https://www.kasina.co.kr" + $('#contents > div.sub_content > div.content > div > div.goods_list_cont.goods_content_7 > div > ul > li:nth-child(1) > div > div.item_photo_box > a').attr('href').trim().replace('..', '');

        console.log(brand, "//", productID, "//", price, "//", productLink, "//", imgLink);
    });
}

parsing();