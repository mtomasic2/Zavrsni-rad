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
            } else {
                console.log('String je uspješno zapisan u datoteku.');
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

        console.log("-----------------------------");
        console.log(sanitizedJsonString);
        console.log("-----------------------------");
    
        try {
            const jsonObject = JSON.parse(sanitizedJsonString);
            return jsonObject;
        } catch (error) {
            throw new Error('Failed to parse JSON object');
        }
    }
  
    async writeApiInfoToFile(chatPrompt, filePath) {
        const chatResponse = await ChatUtils.getChatCompletionResponse(chatPrompt);
        console.log(chatResponse);
        const extractedJson = this.extractJsonFromString(chatResponse);
        console.log(extractedJson);
        this.writeToFile(filePath, JSON.stringify(extractedJson));
    }
}

module.exports = ApiInfoHandler;