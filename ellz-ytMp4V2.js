// const axios = require('axios')
import axios from 'axios'

let baseUrl = 'https://cv76.ytcdn.app/api/json/convert'

async function ytMp4(url) {
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
    let dataYt = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${id}&key=AIzaSyBn0jhzuq0C48igfxbIzhKEjMKYQwvK3_o`)
    let items = dataYt.data.items
    let snippet = items[0].snippet
    let desk = snippet.description
    let time = snippet.publishedAt
    let up = await formatTime(time)
    if (desk == '') desk = 'Nothing.'
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
            mp4: izall.data.result,
            deskripsi: desk,
            upload: up,
            channel: snippet.channelTitle,
            resolusi: '360p'
          },
        }
        console.log(items)
        return result
      } else if (izall.data.result === 'Converting') {
        await new Promise(resolve => setTimeout(resolve, 3000))
      }
    }
  } catch (error) {
    console.log(error)
  }
}
export { ytMp4 }
// ytMp4('https://youtube.com/watch?v=4EEeDC0D4eI')

async function formatTime(time) {
const isoDate = time;
const date = new Date(isoDate);

const formattedDate = date.toLocaleString('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short'
   });
   return formattedDate
}