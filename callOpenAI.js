import OpenAI from 'openai';
import config from './config.js';

const openai = new OpenAI({
  apiKey: config.apiKey
});

async function callOpenAI(diff, prompt) {
  const stream = await openai.chat.completions.create({
    model: config.model,
    messages: [{
        role: "user",
        content: `${prompt}:\n${diff}`
    }],
    stream: true,
  });

  for await (const part of stream) {
    if (part.choices[0].delta.content) {
      process.stdout.write(part.choices[0].delta.content);
    }
  }
  console.log('\n');
}

export default callOpenAI;
