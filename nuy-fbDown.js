import axios from 'axios'
import * as cheerio from 'cheerio';

async function fbDown(url) {
     let data = {
         k_exp: "1719382502",
         k_token: "caff0706549d24c12d4e8a6ba2f350b3785d3cff2864c26b25007513146eb455",
         q: url,
         lang: "id",
         web: "fdownloader.net",
         v: "v2",
         w: ""
        }

  try {
    let response = await axios('https://v3.fdownloader.net/api/ajaxSearch?lang=id', {
        method: "POST",
        data,
        headers: {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Origin": "https://fdownloader.net",
          "Referer": "https://fdownloader.net/",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
             }
          })
          let html = response.data.data
          let $ = await cheerio.load(html)
          let link = $('.download-link-fb')
          let durasi = $('p').text()
          let vid = []
          link.each((index, element) => {
          let links = $(element).attr('href')
          let resolusi = $(element).attr('title')
          //console.log(href)
          //console.log(link2)
               vid.push({
               links,
               resolusi
               })
            })
          let result = {
             status: true,
             creator: 'nuyOfc',
             vid_HD: vid[0],
             vid_SD: vid[1],
             durasi: durasi
             }
             console.log(result)
             return result
      } catch(error) {
         console.log(error)
         return error
       }
    return
}

export { fbDown }