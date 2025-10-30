// const axios = require('axios')
// const cheerio = require('cheerio')
import axios from 'axios'
import * as cheerio from 'cheerio'

async function ttDown(urls) {
    let payload = {
         language_id: '1',
         query: urls,
       }
try {
   let res = await axios.post('https://ttsave.app/download', payload, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'Content-Type': 'application/json',
            'Cookie': '_ga=GA1.1.2134200012.1719399150; _ga_1CPHGEZ2VQ=GS1.1.1719399149.1.1.1719400570.0.0.0; cf_clearance=AMoObHM9jPMqxdExN3h1gecMpHhSX56.JuBcctC4egs-1720096128-1.0.1.1-DQOudoG84OdufBHa1bZNH.fjOXbZ5Cny8oBREgfeBd31k4CC0tgvtnp57UnJpHT2zrvhT8WmJ78ZX0Numo7dwA; XSRF-TOKEN=eyJpdiI6IkdpL1cxc091Y2JMb0VnZUZhVDNuOGc9PSIsInZhbHVlIjoicG9ZaTVua2w1U1M5ZmtxWVNaKy9yYjZYaTQ4K1ZuN2taaHpKeFVYY09aL1dzY3d3a0FmM0RIcHVzSnhYb0JFS3o4cmlLMVRVMjJNNU5LL0JZcTNqZE5qcVd1M2FwYjZrQ0VvSFFQMElYdHVNWTExMzdabnZKbVJXZHQ3NmpDN3UiLCJtYWMiOiIzMWVjM2Q0MTNiNzViZmNjZTNhZDVhNDA5M2FkNDUzNTBkOGJkYjA3ZTA5YTM5MWJlMzY1M2YwM2YzMjI1M2U0IiwidGFnIjoiIn0%3D; ttsaveapp_session=eyJpdiI6Ik9reTBPR1J5Zy9saVpXSHRPTzBYY3c9PSIsInZhbHVlIjoiTUREVzg2eVU2SDBTQy9oVnNobkIyRW1Od1hXZmV5emJVMnhEZjBsRUJJM2xjUFdkc2tMb1FRSjQ3Z2l1NGdvSWsxNTJNUCtIc2JJZ0hVdjd6dHBkTkZRU0gxcTU5UjJNVU9Xd1ZGRXhHcnVPZExBOUsveWdkanNJT3orU3BwT2giLCJtYWMiOiJlYTNmYzlhZjE0MmZmMTRjY2Q4MDZjZjAyMjRkMGQyZWMzYjFlZDliNmRlOWJmNTEzNTY5ZWFjYWM5MDgwNjdlIiwidGFnIjoiIn0%3D',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
            'X-Xsrf-Token': 'eyJpdiI6IkdpL1cxc091Y2JMb0VnZUZhVDNuOGc9PSIsInZhbHVlIjoicG9ZaTVua2w1U1M5ZmtxWVNaKy9yYjZYaTQ4K1ZuN2taaHpKeFVYY09aL1dzY3d3a0FmM0RIcHVzSnhYb0JFS3o4cmlLMVRVMjJNNU5LL0JZcTNqZE5qcVd1M2FwYjZrQ0VvSFFQMElYdHVNWTExMzdabnZKbVJXZHQ3NmpDN3UiLCJtYWMiOiIzMWVjM2Q0MTNiNzViZmNjZTNhZDVhNDA5M2FkNDUzNTBkOGJkYjA3ZTA5YTM5MWJlMzY1M2YwM2YzMjI1M2U0IiwidGFnIjoiIn0='
           }
        })
      let html = res.data
      let $ = await cheerio.load(html)
      let a = $('a')
     // let titlee = $('a').slice(1).attr('title')
 //     console.log(html)
      let titles = []
      a.slice(1).each((i, e) => {
         if (i < 1) {
         let name = $(e).attr('title')
         let url = $(e).attr('href')
         let usrname = $(e).text()
         titles.push({usrname, name, url})
           }
        })
 //       console.log(titles)
        let tete = []
        let img = $('img').attr('src')
        a.slice(2).each((i, e) =>{
        let link = $(e).attr('href')
        tete.push({link})
        })
 //       console.log(tete)
      let title = $('p.text-center').text()
      console.log(title)
      let result = {
            status: true,
            creator: 'NuyyOfc',
            data: {
               title: title,
               username: titles[0].usrname,
               name: titles[0].name,
               url_auth: titles[0].url,
               video: tete[0].link,
               audio: tete[2].link,
               avatar: img
              }
           }
        console.log(result)
        return result
    } catch(error) {
      console.log(error)
      return error
    }
   return;
}
// ttDown('https://vt.tiktok.com/ZSY7syoYQ/')
export { ttDown }