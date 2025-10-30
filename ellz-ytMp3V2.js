// const axios = require('axios')
import axios from 'axios'

let baseUrl = 'https://cv76.ytcdn.app/api/json/convert'

async function ytMp3(url) {
  try {
    let res = await axios('https://x2download.app/api/ajaxSearch', {
      method: 'POST',
      data: {
        q: url,
        vt: 'home',
      },
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://x2download.app',
        'Referer': 'https://x2download.app/id40/download-youtube-to-mp3',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })

    let id = res.data.vid
    let token = res.data.token
    let pire = res.data.timeExpires
    let data = {
      v_id: id,
      ftype: 'mp4',
      fquality: '360p',
      fname: res.data.fn,
      token: token,
      timeExpire: pire,
    }

    let headers = {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Origin': 'https://x2download.app',
      'Referer': 'https://x2download.app/',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWeKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
    }

    let code = 300
    let izall

    while (code !== 200) {
      izall = await axios(baseUrl, {
        method: 'POST',
        data,
        headers,
      })

      code = izall.data.statusCode

      if (code === 200) {
        let result = {
          status: true,
          creator: 'Zaell',
          data: {
            title: res.data.title,
            thumbnail: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
            mp3: izall.data.result,
          },
        }
        console.log(result)
        return result
      } else if (izall.data.result === 'Converting') {
        await new Promise(resolve => setTimeout(resolve, 3000))
      }
    }
  } catch (error) {
    console.log(error)
  }
}
 export { ytMp3 }
// ytMp3('https')