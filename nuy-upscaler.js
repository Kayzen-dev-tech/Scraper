import axios from 'axios'
import FormData from 'form-data'

async function upscaler(url) {
  try {
    const fileUrl = url
    const uploadUrl = 'https://get1.imglarger.com/api/Upscaler/Upload';

    const downloadResponse = await axios.get(fileUrl, { responseType: 'arraybuffer' });

    const formData = new FormData();
    formData.append('myfile', Buffer.from(downloadResponse.data), 'file.jpg');
    formData.append('scaleRadio', '2');
    formData.append('isLogin', '0');

    const uploadResponse = await axios.post(uploadUrl, formData, {
      headers: {
        ...formData.getHeaders(),
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        "Connection": "keep-alive",
        "Host": "get1.imglarger.com",
        "Origin": "https://imgupscaler.com",
        "Referer": "https://imgupscaler.com/",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
      }
    });

   // console.log(uploadResponse.data);
  let dataCode = uploadResponse.data
  let code = dataCode.data.code
    
  let checkData = 'https://get1.imglarger.com/api/Upscaler/CheckStatus';
  let responseCode = await axios(checkData, {       method: 'POST',
      data: {
         code: code,
         isLogin: '0',
         scaleRasio: '2',
            },
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        "Connection": "keep-alive",
        "Host": "get1.imglarger.com",
        "Origin": "https://imgupscaler.com",
        "Referer": "https://imgupscaler.com/",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
      }
    });
    
    let codeResult = responseCode.data.code
    // console.log(codeResult)
    if (codeResult === 200) {
    await new Promise(resolve => setTimeout(resolve, 5000))
        let result = {
              status: true,
              creator: 'nuyOfc',
              imageUrl: 'https://get1.imglarger.com/upscaler/results/' + code + '_2x.jpg'
           }
       // console.log(result)
      return result
     } else {
        console.log('This Page Error')
        return 'This Page Error'
     }
  } catch (error) {
    console.error('Error:', error);
     }
  return
}

export { upscaler }