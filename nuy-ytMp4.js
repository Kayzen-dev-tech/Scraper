// const axios = require('axios');
// const cheerio = require('cheerio');
import axios from 'axios'
//import * as cheerio from 'cheerio'

async function ytMp4(url) {
   let payload = {
                platFormType: "youtube_video_downloader",
                url: url
            }
try {
       let i, r, rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        r = url.match(rx);
        console.log(r[1]);
       let id = r[1]
       let dataYt = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${id}&key=AIzaSyBn0jhzuq0C48igfxbIzhKEjMKYQwvK3_o`)
       let yt = await axios('https://v4.mp3youtube.cc/api/getVideoInfo', {
          method: 'POST',
          data: {
            link: url,
          },
          headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'PHPSESSID=qd0dandvv2dlmr2hjt4krmnlnq',
            'Origin': 'https://v4.mp3youtube.cc',
            'Referer': 'https://v4.mp3youtube.cc/download/W2MpGCL8-9o',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        
       let payload = {
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
       let res = await axios.post('https://api.cobalt.tools/api/json', payload, { headers })
       let durasi = yt.data.videoTime
       let items = dataYt.data.items[0].snippet
       let channel = items.channelTitle
       let local = items.localized
       let title = local.title
       let desk = local.description
       let result = {
             status: true,
             creator: 'Anisa Official',
             data: {
                title,
                channel,
                durasi: durasi,
                mp4: res.data.url,
                desk: desk
               }
          }
       console.log(result)
       return result
     } catch(error) {
       console.log(error)
       return error
     }
}

// ytMp4('https://youtube.com/watch')
export { ytMp4 }

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}