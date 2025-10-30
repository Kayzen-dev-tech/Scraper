//Nuyy Ofc

import axios from 'axios'
import * as cheerio from 'cheerio'

async function fbDownV2(url) {
   try {
        let response = await axios('https://getmyfb.com/process', {
             method: 'POST',
             data: {
                id: url,
                locale: "id",
               },
             headers: {
               "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
               "cookie": "PHPSESSID=mu3r5gbv8u2r6cm5od4pfd913b;",
               "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
                  }
             })
       let html = response.data;
       let $ = await cheerio.load(html)
       let vid1 = $('a.hd-button').attr('href')
       let vid2 = $('a.sd-button').attr('href')
       const ayam = {
             status: true,
             creator: 'NuyyOfc',
             data: {
                 vid_Hd: vid1,
                 vid_Sd: vid2
              }
            }
           return ayam;
        //   console.log("video SD:" + vid2)
       } catch(error) {
       console.log(error)
       }
       return
}

export { fbDownV2 }