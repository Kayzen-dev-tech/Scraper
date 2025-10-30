// const Groq = require("groq-sdk");
import Groq from "groq-sdk"

const groq = new Groq({ apiKey: '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' });

async function llama(content) {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: "llama3-8b-8192",
  });
  // Print the completion returned by the LLM.
  let chatAI = chatCompletion.choices[0]?.message?.content || ""
  let result = {
        status: true,
        creator: 'NuyyOfc',
        message: chatAI
    }
   console.log(result)
   return result
}
//llama('coba buatkan code javascript random alfabet simpel function')
export { llama }