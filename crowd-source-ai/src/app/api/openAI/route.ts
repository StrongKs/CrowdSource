"use server";

import OpenAI from "openai";

// Debugging: Print the API key
console.log("Raw API Key:", process.env.OPENAI_API_KEY);
console.log("API Key Length:", process.env.OPENAI_API_KEY?.length || "Not Set");

const openai = new OpenAI();


export async function OpenAI_Request(_content: string) {
    const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: _content }],
        store: true,
        stream: true,
    });
    let message = "";
    for await (const chunk of stream) {
        message += chunk.choices[0]?.delta?.content || "";
    }
    return message;


//   console.log(completion.choices[0].message.content);
}
