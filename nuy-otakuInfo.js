import axios from 'axios'
import * as cheerio from 'cheerio'

async function otakuInfo(links) {
try {
   let getInfo = await axios.get(links)
  let htmlInfo = getInfo.data
  let _$ = await cheerio.load(htmlInfo)
  let dive = _$('div')
  let img = dive.find('.attachment-post-thumbnail')
  let foto = img.attr('src')
  let p = _$('p')
  let span = p.find('span')
  let desu = [];
 span.each((index, element) => {
    let nuy = _$(element).text().trim()
    let info = nuy.split(' ')
    let infos = info.slice(1).join(' ')
       desu.push({
            infos
            })
         })
//     console.log(desu)
  let li = _$('li')
  let _span = li.find('span')
  let black = _span.find('a')
  let urls = []
  black.each((i, element) =>{
     if (i < 4) {
       let url = _$(element).attr('href')
       let eps = _$(element).text()
         urls.push({
              url,
              eps
              })
            }
         })
  let uploads = []
  let _li = _$('li')
  let __span = _li.find('span[class="zeebr"]')
  __span.each((i, element) => {
     if (i < 4) {
       let upload = _$(element).text()
         uploads.push({
               upload
             })
           }
        })
//       console.log(uploads)
  let desk = _$('div[class="sinopc"]').text()
   // console.log(div)
       let result = {
           status: true,
           creator: 'NuyyOfc',
           foto: foto,
           info: {
               judul: desu[0].infos,
               japanes: desu[1].infos,
               skor: desu[2].infos,
               produser: desu[3].infos,
               tipe: desu[4].infos,
               status: desu[5].infos,
               totalEps: desu[6].infos.split(' ').slice(1).join(' '),
               durasi: desu[7].infos,
               tanggalRilis: desu[8].infos.split(' ').slice(1).join(' '),
               studio: desu[9].infos,
               genre: desu[10].infos,
               deskripsi: desk
               },
           episode: [
              {
               url: urls[0].url,
               eps: urls[0].eps,
               rilis: uploads[0].upload,
               },
               {
               url: urls[1].url,
               eps: urls[1].eps,
               rilis: uploads[1].upload,
               },
               {
               url: urls[2].url,
               eps: urls[2].eps,
               rilis: uploads[2].upload,
               },
               {
               url: urls[3].url,
               eps: urls[3].eps,
               rilis: uploads[3].upload,
               }
            ]
          }
          console.log(result)
          return result;
      } catch(error) {
      console.log(error)
      return error
     }
   return;
}

export { otakuInfo }