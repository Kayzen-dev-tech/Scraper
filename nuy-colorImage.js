import axios from 'axios'
import FormData from 'form-data'

const apiKey = 'b2b63293-9177-4f1b-8e9d-f0d19e3026ed';
//const imageUrl = 'https://telegra.ph/file/14c1e303cee44b3434186.jpg';

async function colorImage(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data, 'binary');

    const form = new FormData();
    form.append('image', imageBuffer, 'file.jpg');

    const headers = {
      'X-IMGGEN-KEY': apiKey,
      ...form.getHeaders()
    };

    const res = await axios.post('https://app.imggen.ai/v1/image-color-correction', form, { headers });
    let image = res.data.image
    //let urlImage = image
    let result = {
          status: true,
          creator: 'NuyyOfc',
          image: image // Buffer.from(image)
            }
            console.log(result)
        return result
  } catch (error) {
    console.error(error);
  }
}

export { colorImage }