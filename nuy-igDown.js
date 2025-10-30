// const axios = require('axios');
import axios from 'axios'

async function igDown(url) {
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
      let key = res.data.data.key
      let result = {
            status: true,
            creator: 'NuyyOfc',
            media: `https://social.ioconvert.com/download?obj=photo&key=${key}&type=video&id=item0&download=1&file_prefix=f2mp`
          }
      console.log(result)
       return result;
     } catch(error) {
       console.log(error)
       return error
     }
}

// igDown('mJo')
export { igDown }