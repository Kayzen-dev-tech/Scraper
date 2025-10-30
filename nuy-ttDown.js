//const axios = require('axios');
//const cheerio = require('cheerio');
import axios from 'axios'
import * as cheerio from 'cheerio'

async function ttDown(url) {
try {
   /* let getToken = await axios.get('https://tmate.cc/')
    let htmls = getToken.data
    let _$ = await cheerio.load(htmls)
    let input = _$('input[name="token"]')
    let token = input.attr('value')*/
        
    let res = await axios('https://tiksave.io/api/ajaxSearch', {
         method: 'POST',
         data: {
             q: url,
             lang: 'id',
            },
         headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': 'https://tiksave.io',
            'Referer': 'https://tiksave.io/id/download-tiktok-mp3',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36'
         }
      })
      let { data } = res.data
      let html = data
      let $ = await cheerio.load(html)
      let onclick = $('a[onclick]')
      let p = $('p')
      let author = p.find('span').text()
     // let username = p.slice(1).find('span').text()
      let a = $('a[class="hover-underline"]')
      let title = $('h3').text()
      let links = []
      onclick.each((i, e) => {
        let link = $(e).attr('href')
        links.push({link})
        })
        let result = {
              status: true,
              creator: 'NuyyOfc',
              data: {
                 title: title,
//                 author:author,
                 vid1: links[0].link,
                 vid2: links[1].link,
                 vid_Hd: links[2].link,
                 audio: links[3].link
                 }
            }
      // console.log(result)
       return result
     } catch(error) {
       console.log(error)
       return error
     }
}

//ttDown('https://vt.tiktok.com/ZSY5kpJee/')
export { ttDown }