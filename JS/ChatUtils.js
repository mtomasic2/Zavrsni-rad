const { encode } = require('gpt-3-encoder')
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration); // Make sure to import the 'openai' library

class ChatUtils {
    static countTokens(text) {
        const encoded = encode(text)
        return encoded.length;
    }

    static async getChatCompletionResponse(chatPrompt) {
        try {
            const completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'system', content: chatPrompt }],
            });
      
            // Dohvatite odgovor od API-ja
            const odgovorApi = completion.data.choices[0].message.content;
            console.log(odgovorApi + '\n---------------------------------------');
            return odgovorApi;
        } catch (error) {
            console.error('Greška prilikom slanja zahtjeva:', error);
            return false;
        }
    }
}

module.exports = ChatUtils;