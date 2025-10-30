// const axios = require('axios');
import axios from 'axios'

async function ytMp3(url) {
try {
     let i, r, rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        r = url.match(rx);
    //    console.log(r[1]);
     let id = r[1]
     let res = await axios('https://v4.mp3youtube.cc/api/getVideoInfo', {
          method: 'POST',
          data: {
            link: url,
          },
          headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'PHPSESSID=inu3l9s3n36tjckqeami03grgb; pp_main_982af82c293078d953c294db08af052a=1; pp_exp_982af82c293078d953c294db08af052a=1721339002243; sb_main_cc8f79ce301c0266cff3d0a896496ee5=1; pp_sub_982af82c293078d953c294db08af052a=3; pp_show_on_982af82c293078d953c294db08af052a=3; sb_page_cc8f79ce301c0266cff3d0a896496ee5=3; sb_count_cc8f79ce301c0266cff3d0a896496ee5=3; sb_onpage_cc8f79ce301c0266cff3d0a896496ee5=1',
            'Origin': 'https://v4.mp3youtube.cc',
            'Referer': 'https://v4.mp3youtube.cc/download/' + id,
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
      let dataVid = res.data
      let channel = dataVid.channelTitle
      let thumb = dataVid.thumbnail
      let durasi = dataVid.videoTime
      let title = dataVid.title
       
       let payload = {
             aFormat: 'opus',
             isAudioOnly: true,
             url: url,
             vQuality: '360'
          }
       let headers = {
              'Accept': 'application/json',
              'Accept-Encoding': 'gzip, deflate, br',
              'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
              'Content-Type': 'application/json',
              'Origin': 'https://cobalt.tools',
              'Referer': 'https://cobalt.tools/',
              'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36'
          }
       let json = await axios.post('https://api.cobalt.tools/api/json', payload, { headers })
       let result = {
            status: true,
            creator: 'Anisa Official',
            data: {
               title: title,
               channel: channel,
               thumbnail: thumb,
               durasi: durasi,
               mp3: json.data.url
             }
          }
       let date = Date.now()
       console.log(result)
       return result
     } catch(error) {
       console.log(error)
       return error
     }
}

// ytMp3('https://youtube.com/watch?v=oOotG8xGRt8')
export { ytMp3 }