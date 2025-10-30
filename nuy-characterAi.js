import axios from 'axios';

async function characterAi(text, chat_Id) {
    let charId = 'kwsYvpyLp0JzX9p7E3qwjga1KOlAWEaSBeXKTaq6U-U';

    try {
        let response = await axios({
            method: "POST",
            url: "https://api.apigratis.site/cai/send_message",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                external_id: charId,
                message: text,
                chat_id: chat_Id
            })
        });

        let result = response.data.result
        let replies = result.replies
        let chatId = result.chat_id
        let ipah = {
            status: true,
            creator: 'NisaaOfcc',
            text: replies[0].text,
            sessionId: chatId
          }
    //      console.log(ipah)
          return ipah;
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        return error;
    }
    return;
}

export { characterAi }