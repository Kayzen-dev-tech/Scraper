// const axios = require('axios')
import axios from 'axios'

async function ytMp4(url) {
  try {
       let baseUrl = 'https://cdn54.savetube.me/info?url='
       let res = await axios.get(baseUrl + url)
       let key = res.data.data.key
       
       let data = res.data.data
       if (res.data.status == true) {
       let { status, title, thumbnail, durationLabel, id, duration } = data
       let dataYt = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${id}&key=AIzaSyBn0jhzuq0C48igfxbIzhKEjMKYQwvK3_o`)
       let items = dataYt.data.items
       let snippet = items[0].snippet
       
       let durasi = await formatSecond(duration)
       let desk = snippet.description
       let time = snippet.publishedAt
       let up = await formatTime(time)
       let res2 = await axios.get('https://cdn54.savetube.me/download/video/360/' + key)
       
       let result = {
             status: true,
             creator: 'Zaell',
             data: {
               title,
               thumbnail,
               mp4: res2.data.data.downloadUrl,
               upload: up,
               deskripsi: desk,
               channel: snippet.channelTitle,
               resolusi: '360p'
              }
          }
       console.log(result)
       return result
           }
       } catch(e) {
         console.log(e)
      }
}

// ytMp3('https://youtube.com/watch?v=3jHKcnX9HLo')
export { ytMp4 }

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

function formatSecond(seconds) {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = seconds % 60;

    let formattedMinutes = String(minutes).padStart(2, '0');
    let formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}