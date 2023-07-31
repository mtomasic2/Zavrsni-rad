const fs = require('fs');
const ChatUtils = require('./ChatUtils.js');

class ApiInfoHandler {
    // Funkcija za čitanje JSON datoteke
    async readApiInfoFromFile(filePath) {
        try {
            const rawData = await fs.promises.readFile(filePath);
            return JSON.parse(rawData);
        } catch (error) {
            console.error('Greška prilikom čitanja JSON datoteke:', error);
            return null;
        }
    }
      
    // Funkcija za pisanje stringa u datoteku
    writeToFile(filePath, content) {
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                console.error('Greška prilikom pisanja u datoteku:', err);
            }
        });
    }
      
    extractJsonFromString(inputString) {
        const startIdx = inputString.includes('```json') ? inputString.indexOf('```json') + 7 : inputString.indexOf('{');
        const endIdx = inputString.includes('```json') ? inputString.lastIndexOf('```') : inputString.lastIndexOf('}');
    
        if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
            throw new Error('Invalid JSON string');
        }
    
        let jsonString = inputString.slice(startIdx, endIdx + 1);
        jsonString = jsonString.trim(); // Uklonite razmake sa početka i kraja JSON stringa
        const sanitizedJsonString = jsonString.includes('`') ? jsonString.slice(0, -1) : jsonString; 

        try {
            const jsonObject = JSON.parse(sanitizedJsonString);
            return jsonObject;
        } catch (error) {
            throw new Error('Failed to parse JSON object');
        }
    }
  
    async writeApiInfoToFile(chatPrompt, filePath) {
        const chatResponse = await ChatUtils.getChatCompletionResponse(chatPrompt);
        const chatResponseOK = chatResponse == false ? '' : chatResponse;
        const extractedJson = chatResponseOK == '' ? '' : this.extractJsonFromString(chatResponse);
        
        if(extractedJson != ''){
            this.writeToFile(filePath, JSON.stringify(extractedJson));
            return true
        }else
            return false;
    }
}

module.exports = ApiInfoHandler;