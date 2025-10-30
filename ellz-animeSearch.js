import axios from 'axios';
import * as cheerio from 'cheerio';

async function animeSearch(query) {
 try {
    let getData = await axios.get(`https://anime-indo.lol/search.php?q=${query}`)
    let html = getData.data
    let $ = await cheerio.load(html)
    let head = $('head')
    let link = head.find('link')
    let web = link.attr('href')
    let anime = $('a')
    
    let response = await axios.get(web)
    let getHtml = response.data;
    let _$ = await cheerio.load(getHtml)
    let td = _$('td.videsc')
    let ipah = td.find('a')
    let nur = [];
    ipah.each((index, element) => {
        let url = _$(element).attr('href')
        let title = _$(element).text()
        nur.push({
        url: 'https://anime-indo.lol' + url,
        title: title
           })
        })
    let result = {
        status: true,
        creator: 'nisaaOfc',
        data: nur
      }
    console.log(result)
    return result;
   } catch(error) {
   return error
     }
   return;
}

export { animeSearch }