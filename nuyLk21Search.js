//Nuy Ofc

import axios from 'axios'
import * as cheerio from 'cheerio'

async function layarKaca(query) {
    try {
    let lk = await axios.get(`https://tv3.lk21official.mom/search.php?s=${query}`)
       let html = lk.data
       let $ = await cheerio.load(html)
       let films = [];
       $('.search-item').each((i, element) => {
            const title = $(element).find('h3 a').text().trim();
            const link = $(element).find('h3 a').attr('href');
            const poster = $(element).find('.search-poster img').attr('src');
            const director = $(element).find('p:contains("Sutradara:")').text().replace('Sutradara:', '').trim();
            const stars = $(element).find('p:contains("Bintang:")').text().replace('Bintang:', '').trim();

            films.push({
                judul: title,
                link: "https://tv3.lk21official.mom" + link,
                thumbnail: "https://tv3.lk21official.mom" + poster,
                sutradara: director,
                aktor: stars
            });
        });
     //  console.log(films)
         let result = {
             status: true,
             creator: "NuyyOfc",
             data: {
               film: films
                }
            }
            console.log(result)
            return result;
 
    } catch(error) {
       return error
    }
   return
}

export { layarKaca }