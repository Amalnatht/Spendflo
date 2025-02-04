import dotenv from 'dotenv';
dotenv.config();

export function getEnvironmentUrl(env: string): string {
    const { PROD_URL, TEST_URL } = process.env;

    if (!PROD_URL || !TEST_URL) {
        throw new Error("missing required environment variables and please check your .env file")
    }
    const environment = env.toLowerCase().trim()
    if (environment === "production") 
        return PROD_URL;
    else if (environment ==='test')
            return TEST_URL;
    else
            return TEST_URL; //default navigation if the input doesn't match
} 