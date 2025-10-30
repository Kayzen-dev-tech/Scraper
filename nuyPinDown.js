import axios from 'axios'

async function pinDown(url) {
   try {
   let response = await axios('https://pintodown.com/wp-admin/admin-ajax.php',{
        method: 'POST',
        data: {
            action: "pinterest_action",
            pinterest: "is_private_video=&pinterest_video_url=" + url
            },
        headers: {
            "content-type": "multipart/form-data; boundary=----WebKitFormBoundarydjsAsne2TjZAVSaj"
              }
         })
        
        let html = response.data;
        let poster = html.data.poster
        let video = html.data.video
       // console.log(html)
       let ipah = {
            status: true,
            creator: "NuyyOfc",
            data: {
              image: poster,
              video: video
                }
            }
        return ipah;
     } catch(error) {
     console.log(error)
      }
    return
}

export { pinDown }