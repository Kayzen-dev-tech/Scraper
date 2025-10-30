// const axios = require('axios')
import axios from 'axios'

async function igMp3(url) {
    let headers = {
           'Accept': 'application/json, text/javascript, */*; q=0.01',
           'Accept-Encoding': 'gzip, deflate, br',
           'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
           'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
           'Origin': 'https://f2mp.com',
           'Referer': 'https://f2mp.com/',
           'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36'
        }
try {
     let info = await axios('https://social.ioconvert.com/video/info', {
              method: 'POST',
              data: {
                type: 'INSTAGRAM',
                url: url
              },
              headers
           })
     let key = info.data.data.key
     
     let convert = await axios('https://social.ioconvert.com/audio/convert', {
              method: 'POST',
              data: {
                id: key,
                quality: '128',
                format: 'mp3',
                prefix: 'F2mp'
              },
              headers
           })
       let { message } = convert.data
       if (message == 'OK') {
       let result = {
             status: true,
             creator: 'NuyOfc',
             mp3: `https://social.ioconvert.com/audio/download?id=${key}&quality=128&format=mp3&prefix=F2mp`
          }
       console.log(result)
       return result
        }
     } catch(error) {
       console.log(error)
       return error
     }
}

// igMp3('A==')
export { igMp3 }