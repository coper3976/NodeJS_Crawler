const axios = require('axios');
const cheerio = require('cheerio');


const url = async () => {
    try {
        return await axios.get("https://www.inflearn.com/courses?s=", {
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
    const $ = cheerio.load(html.data);
    const div = $(".course_card_item");

    div.each((idx, node) => {
        const title = $(node).find(".course_title").text();
        console.log(title);
    });
}

parsing();


