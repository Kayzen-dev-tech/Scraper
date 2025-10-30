import axios from 'axios';
// const axios= require('axios')

async function txt2Img(prompt) {
  let key = [
'76247d83-eed7-41e2-9187-9e741c05a6b9',
'd323e5fb-d11a-47c9-b4cb-316d62817bb9',
'a428d6c5-36a1-4af0-9b1a-2cdef0326434',
'1c022783-22a7-4c0e-af37-1387e9fdee23',
'520890eb-17db-4085-a24b-09566d51d28f',
]
const options = {
  method: 'POST',
  url: 'https://api.prodia.com/v1/sd/generate',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'X-Prodia-Key': `${pickRandom(key)}`
  },
  data: {
    model: 'absolutereality_v181.safetensors [3d9d4d2b]',
    negative_prompt: 'Super Realistic, Super Smooth 8K HD',
    prompt: prompt,
    width: 512,
    height: 512,
    steps: 20,
    style_preset: 'enhance',
    cfg_scale: 7,
    seed: -1,
    upscale: false,
    sampler: 'DPM++ 2M Karras'
  }
};
try {
   let res = await axios(options)
 //  await new Promise(resolve => setTimeout(resolve, 10000));

let _options = {
  method: 'GET',
  url: 'https://api.prodia.com/v1/job/' + res.data.job,
  headers: {
    accept: 'application/json',
    'X-Prodia-Key': `${pickRandom(key)}`
  }
};

     let _res = await axios(_options)
     if (_res.data.status !== 'succeeded') {
     await new Promise(resolve => setTimeout(resolve, 5000));
     let re = await axios(_options)
     console.log(re.data)
       let result = {
         status: true,
         creator: 'NuyyOfc',
         image: re.data.imageUrl
         }
       return result
       }
     } catch(error) {
       console.log(error)
       return error
     }
   return
}

 export { txt2Img }
// txt2Img('5 shark, flying, cloud, smile, bright, sea, cartoon, 3D')

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}