import axios from 'axios'
import * as cheerio from 'cheerio'
import { JSDOM } from 'jsdom'


async function igDown(url) {
   try {
   let getToken = await axios.get('https://igdownloader.app/id')
   let html = getToken.data;
   let $ = cheerio.load(html);
   let lang = $('html').attr('lang')
   
   let response = await axios('https://v3.igdownloader.app/api/ajaxSearch', {
      method: 'POST',
      data: new URLSearchParams({
          q: url,
          t: 'media',
          lang: lang
           }),
      headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
         }
      });
      
      let webHtml = response.data;
      let ipah = webHtml.data
      let $$ = await cheerio.load(ipah)
      let b = $$('[onclick]')
      if (b.length > 0) {
      let asu = b.attr('href')
      let result = {
          status: true,
          creator: 'NuyOfc',
          media: {
             vid: asu
             }
         }
  // console.log(result)
   return result
   }
  } catch(error) {
  console.log(error)
  }
  return
}
export { igDown }