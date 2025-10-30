// const axios = require('axios')
// const cheerio = require('cheerio')
import axios from 'axios';
import * as cheerio from 'cheerio';

async function ttDown(url) {
try {
    let res = await axios('https://savetik.co/api/ajaxSearch', {
          method: 'POST',
          data: {
            q: url,
            lang: 'en'
          },
          headers: {
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'https://savetik.co',
            'Pragma': 'no-cache',
            'Referer': 'https://savetik.co/en2',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest',
           }
       })
      let data = res.data.data
      if (data) {
          let html = res.data.data
          let $ = await cheerio.load(html)
          let title = $('h3').text()
          let onclick = $('a[onclick]')
          let file = [];
          onclick.each((i, e) => {
               let link = $(e).attr('href')
               file.push({ link })
                })
             let result = {
                   status: true,
                   creator: 'NuyOfc',
                   data: {
                     title: title,
                     mp4: file[0].link,
                     mp3: file[3].link,
                     hd: file[2].link
                  }
              }
      console.log(result)
      return result
      } else {
      let noResult = {
              status: false,
              creator: 'NuyOfc',
              data: `Not Response :/`
            }
      console.log(noResult)
      return noResult
        }
    } catch(error) {
      console.log(error)
      return error
    }
}
// ttDown('https:///ZS2dJdkfA/')
export { ttDown }