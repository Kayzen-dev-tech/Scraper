// const axios = require('axios');
// const cheerio = require('cheerio');
import axios from 'axios'
import * as cheerio from 'cheerio'

async function twitImage(url) {
try {
     let res = await axios('https://snapvid.net/api/ajaxSearch', {
             method: 'POST',
             data: {
               __RequestVerificationToken: 'CfDJ8E6ybIOHrjRCneZVgKPaXdGqCKr5L25xs9KsDN0eiVK87K4WdSQ9fyjIjQit7t6OCAjPMm7QqoyG9QetnZPVLyHx7yUlVfK5AMnqQz3OCvoPSK5z1mekNJcg-qIgxoMaK9dh3KbYz4Ctf8B03PExiN8',
               q: url,
               w: ''
             },
             headers: {
               'Accept': '*/*',
               'Accept-Encoding': 'gzip, deflate, br',
               'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
               'Cookie': '.AspNetCore.Antiforgery.cl57I6-xYTI=CfDJ8E6ybIOHrjRCneZVgKPaXdEKQr1Sx8e8ZnvGOIo60SXXgLfgVU45a22RfTacvOrXzJjDvSytVzQif6SxV05nKRo6NTY_hsNWrPOTr8obRTsCoCpTyeQ6-n255osc84Ku784BhkVZHuzGJN0J3lFrB50',
               'Origin': 'https://snapvid.net',
               'Referer': 'https://snapvid.net/id/twitter-downloader',
               'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
               'X-Requested-With': 'XMLHttpRequest'
             }
         })
     let $ = await cheerio.load(res.data.data)
     let a = $('a[class]')
     let img = a.attr('href')
     let result = {
           status: true,
           creator: 'NuyOfc',
           data: {
              image: img,
              source: url
           }
     }
     console.log(result)
     return result
     } catch(error) {
       console.log(error)
       return error
     }
}

// twitImage('https://x.com/josoominm/status/1815565090013474969?t=cleb-XMFCs-1LF7uVD0Htg&s=19')
export { twitImage }