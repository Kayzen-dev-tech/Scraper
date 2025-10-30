// const axios = require('axios');
import axios from 'axios'

async function igImg(url) {
try {
     let res = await axios('https://social.ioconvert.com/video/info', {
             method: 'POST',
             data: {
               type: 'INSTAGRAM',
               url,
             },
             headers: {
               'Accept': 'application/json, text/javascript, */*; q=0.01',
               'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
               'Origin': 'https://f2mp.com',
               'Referer': 'https://f2mp.com/',
               'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36'
             }
         })
        let data = res.data.data
        let image = data.images
        let key = data.key
        let media = [];
        for (let i = 0; i < image.length; i++) {
           let link = `https://social.ioconvert.com/download?obj=photo&key=${key}&type=images&id=${image[i].id}&download=&file_prefix=f2mp`
           media.push({link})
         }
      let result = {
            status: true,
            creator: 'NuyyOfc',
            media,
          }
      console.log(result)
       return result;
     } catch(error) {
       console.log(error)
       return error
     }
}

// igDown('')
export { igImg }