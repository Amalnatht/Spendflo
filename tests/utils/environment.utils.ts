import dotenv from 'dotenv';
dotenv.config();

export function getEnvironmentUrl(env: string): string {
    if (env.toLowerCase() === "prod") 
        return process.env.PROD_URL || "https://test.spendflo.com";
    else if (env.toLowerCase()==='test')
            return process.env.TEST_URL || "https://test.spendflo.com";
    else
            return process.env.TEST_URL || "https://test.spendflo.com";
}