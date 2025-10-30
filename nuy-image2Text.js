// const axios = require('axios');
import axios from 'axios'

async function image2Text(image) {
try {
     let res = await axios('https://cococlip.ai/api/v1/image_script_generate?image=' + image, {
            method: 'GET',
            headers: {
               'Accept': '*/*',
               'Accept-Encoding': 'gzip, deflate, br',
               'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
               'Cookie': '__Host-authjs.csrf-token=4c1bc2bd995a2877efd7ad66297d87a9f1d041314ac7ee9b6bfd2ab87c5fad31%7C7a64b87d215858a5ed780e5e6f6bc297236d1f20911e813e3ea1d351882ae6a3; __Secure-authjs.callback-url=https%3A%2F%2Fcococlip.ai',
               'Referer': 'https://cococlip.ai/features/image-to-prompt',
               'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
            }
        })
     let result = {
           status: true,
           creator: 'NuyOfc',
           prompt: res.data.prompt
         }
     console.log(result)
     return result
     } catch(error) {
       console.log(error)
     }
}

// image2Text('https://telegra.ph/file/76b45dff32b4cf9a64f07.png')
export { image2Text }