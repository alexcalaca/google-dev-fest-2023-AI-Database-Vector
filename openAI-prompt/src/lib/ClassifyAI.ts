import { createTaggingChain } from "langchain/chains";
import type { FunctionParameters } from "langchain/output_parsers";

export class AutonomyAI {
    private schema: FunctionParameters;
    
    constructor() {
        this.schema = {
            type: "object",
            properties: {
                calculation: { type: "string", enum: ["calculus"]},
                news: { type: "string", enum: ["get news", "information"], description: "Set get news if user wants the latest news in general or tag information for general searching"},
                weather: { type: "string", enum: ["current condition", "forecast"], description: "Set current condition when the user ask about currenlty or forecast and it's necessary some future information about the weather"},
            },
          };
    }

    public classify = async ({chat, model}: {
        chat: string;
        model: any;
    }) => {
        const chain = createTaggingChain(this.schema, model);
        const result = await chain.run(chat) 
        return result
    }
}