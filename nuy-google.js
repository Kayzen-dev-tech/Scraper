// const axios = require('axios')
import axios from 'axios';

async function google(query) {
try {
     let res = await axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyB6HpEVkEvrexlhUFiwZii9R7dCqVEkBjk&cx=a3a45013127e34795&q=${query}`)
     if (res.data.items) {
     let items = res.data.items
     let results = []
     for (let i = 0; i < items.length; i++) {
         let title = items[i].title
         let link = items[i].link
         let snippet = items[i].snippet
         results.push({ title, link, snippet })
         }
      let result = {
            status: true,
            creator: 'NuyOfc',
            data: results
          }
         console.log(result)
         return result
        } else {
         let noResult = {
               status: false,
               creator: 'NuyOfc',
               data: `Page Not found :/`
            }
        console.log(noResult)
        return noResult
         }
     } catch (error) {
       console.log(error)
       return error
    }
}

// google('tiktok')
export { google }