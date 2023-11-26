import {PromptExtractor} from "./lib/PromptExtractor";
import {OpenAIApi} from "./lib/OpenAI";
import {apiKeys} from "./config/keys.config";
import {TerminalInterface} from "./lib/TerminalInterface";

export const init = async () => {
    const terminalInterface = new TerminalInterface();
    const openAIApiKey = apiKeys.openAI
    const autonomyAI = new PromptExtractor();
    const openAIChatModel = new OpenAIApi(openAIApiKey)
    const messages: any = [];
    
    while (true) {
        const userInput = await terminalInterface.requestInput("AI: How do I help you?\nYou: ")
        messages.unshift(userInput);

        await autonomyAI.extractor({
            chat: messages.slice(0, 3).join("\nUSER: "),
            model: openAIChatModel.completion
        })
    }
}
init();