import readline from "readline";

export class TerminalInterface {
    constructor() {
    }

    public requestInput = (prompt: string) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return new Promise((res) => {
            rl.question(prompt, async (userInput: string) => {
                rl.close();
                res(userInput)
            });
        })
    }
}