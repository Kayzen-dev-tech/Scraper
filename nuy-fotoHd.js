// const axios = require('axios');
// const FormData = require('form-data');
import axios from 'axios';
import FormData from 'form-data';

async function fotoHd(img) {
  try {
    let getImage = await axios.get(img, { responseType: 'arraybuffer'})
    let url = "https://api.vyro.ai/v1/imagine/api/upscale";
    
    let formdata = new FormData();
         formdata.append("image", Buffer.from(getImage.data, 'binary'), 'file.jpg');
    let headers = {
          ...formdata.getHeaders(),
          "Authorization": "Bearer vk-IBn5XmHxFxgTJPMX39HacD4a4jT1K6b9U8zNMMj7yQAAj"
        }

    let requestOptions = {
         method: 'POST',
         data: formdata,
         headers: headers,
        };
    let res = await axios(url, requestOptions)
    let result = {
          status: true,
          creator: 'NuyOfc',
          result: res.data
       }
    console.log(result)
    return result
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    return 'Error occurred';
  }
}

// fotoHd('https://telegra.ph/file/72689856f642a5a08b46b.jpg')
export { fotoHd }