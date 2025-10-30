//Nuy Ofc

import axios from 'axios'
import * as cheerio from 'cheerio'

async function ttDown(url) {
    try {
    let response = await axios('https://ssstik.io/abc?url=dl', {
          method: 'POST',
          data: {
              id: url,
              locale: 'id',
              tt: 'YW4xN3M4'
           },
          headers: {
              "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
              "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
           }
       })
    
    
    let html = response.data
    let $ = await cheerio.load(html);
    let a = $('a')
    let music = $('a.download_link.music').attr('href')
    let vid = a.attr('href')
    let text = $('p.maintext').text()
    let img = $('img')
    let thumb = img.attr('src')
    let name = img.attr('alt')
    let ipa = a.attr('href')
    
    const result = {
         status: true,
         creator: "NuyyOfc",
         data: {
            author: name,
            caption: text,
            image: thumb,
            video: vid,
            audio: music,
            }
        }
      return result;
    console.log(result)
    } catch (error) {
        console.log(error);
    }
  return;
}

export { ttDown }