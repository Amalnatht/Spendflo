import dotenv from 'dotenv';
dotenv.config();

export function getEnvironmentUrl(env: string): string {
    const prodUrl = process.env.PROD_URL;
    const testUrl = process.env.TEST_URL;

    if (!prodUrl || !testUrl) {
        throw new Error("missing required environment variables and please check your .env file")
    }
    if (env.toLowerCase() === "Production env") 
        return prodUrl;
    else if (env.toLowerCase()==='Test env')
            return testUrl;
    else
            return testUrl; //default navigation if the input doesn't match
} 