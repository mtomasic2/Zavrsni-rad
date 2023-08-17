const { encode } = require('gpt-3-encoder')
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

class ChatUtils {
    static countTokens(text) {
        const encoded = encode(text)
        return encoded.length;
    }

    static async getChatCompletionResponse(chatPrompt) {
        try {
            const completion = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'system', content: chatPrompt }],
            });
            const apiResponse = completion.choices[0].message.content;
            return apiResponse;
        } catch (error) {
            console.error('Greška prilikom slanja zahtjeva:', error);
            return false;
        }
    }
}

module.exports = ChatUtils;