import {PromptTemplate} from "langchain";
import {ExtractorParametersI} from "../type";

export class PromptExtractor {
    constructor() {
    }

    public extractor = async ({chat, model}: {
        chat: string;
        model: (prompt: string) => Promise<string>;
        //params: ExtractorParametersI
    }) => {
        const template = PromptTemplate.fromTemplate<{ chat: string; }>(
            `You are an AI extractor tool with a purpose meant for extracting specific PARAMETERS from a provided CONVERSATION, these PARAMETERS are defined as in the provided interface below:
            
            The following are an example of provided parameters
            
            [{{
              "city": {{ "type": "string", "description": "city name", "context": "weather search" }},
              "firstName": {{ "type": "string", "description": "User firstname", "context": "User personal information" }},
            }}]
            
            - First example:
            Here is an operational example, for CONVERSATION example: "I am jake, what is the weather in Barcelona?"
            Your response should be a json, like in the following example: {{"city":"barcelona", "firstName": "jake"}}
            - Second example:
            Here is a second operational example, for CONVERSATION example: "I am jake white, what is the weather like?"
            Your response should be a json, like in the following example: {{"city":null, "firstName": "jake"}}
            
            You should execute these operations on the following provided CONVERSATION and PARAMETERS:
            
            CONVERSATION: {chat}
            `
        )
        const formatted = await template.format({
            chat: chat,
        })

        const result = await model(formatted);
        console.log(result)
    }
}