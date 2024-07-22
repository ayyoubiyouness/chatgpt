import OpenAI from 'openai';
export const configureOpenAI = () => {
    const config = new OpenAI({
        apiKey : process.env.OPENAI_API,
        organisation : process.env.ORGANISATION_ID
    })
    return config
} 