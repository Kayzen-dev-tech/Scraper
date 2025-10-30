// const axios = require('axios')
import axios from 'axios'

async function ssWeb(base) {
try {
     let payload = {
           query: `{Property{liveScreenshot(address: \"${base}\"){width height hash}}}`
}
     let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Referer': 'https://fullpagescreencapture.com/',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36'
             }
     let res = await axios.post('https://api.hexometer.com/v2/ql', payload, { headers })
     if (res.data.data.Property.liveScreenshot) {
     let result = {
           status: true,
           creator: 'NuyOfc',
           data: {
             title: `* *Result From:* ${base}`,
             image: `https://fullpagescreencapture.com/screen/${res.data.data.Property.liveScreenshot.hash}.jpg`
             }
         }
     console.log(result)
     return result
     } else {
     let noResult = {
           status: false,
           creator: 'NuyOfc',
           data: {
             title: `404 : Not Found :(`,
             image: `https://telegra.ph/file/223c72d8fb2eb56bdba9c.jpg`
              }
           }
        console.log(noResult)
        return noResult
           }
      // console.log(res.data)
     } catch(error) {
       console.log(error)
       return error
     }
}

// ssWeb('https://widipe.com/playground')
export { ssWeb }