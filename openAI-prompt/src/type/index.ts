export interface ExtractorParametersI {
    [key: string]: {
        type: "string" | "int" | "float";
        description: string;
        context: string;
    }
}