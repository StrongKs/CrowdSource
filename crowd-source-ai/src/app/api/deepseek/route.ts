import OpenAI from "openai";

// Assuming you are using a Node.js environment, you can use process.env
const env = (key: string) => process.env[key];

// for backward compatibility, you can still use `https://api.deepseek.com/v1` as `baseURL`.
const openai = new OpenAI({
        baseURL: 'https://openrouter.ai/api/v1',
        apiKey: "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",
        dangerouslyAllowBrowser: true,
});

export async function DeekSeepRequest(_content: string) {
  const completion = await openai.chat.completions.create({
    model: 'deepseek/deepseek-r1:free',
    messages: [
      {
        role: 'user',
        content: _content,
      },
    ],
  });

  console.log(completion.choices[0].message.content);
}
