import dotenv from "dotenv";
dotenv.config()

export const apiKeys = {
    openAI: process.env.OPEN_AI_API_KEY as string
}