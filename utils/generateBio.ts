import { Configuration, OpenAIApi } from 'openai';

export const generateBio = async (
  name: string,
  desc: string,
  keywords: string[],
  pov: string,
  vibe: string,
  platform: string
) => {
  const runtimeConfig = useRuntimeConfig();
  const openai_key = runtimeConfig.openaiApiKey;

  if (!openai_key) {
    return;
  }

  const config = new Configuration({
    apiKey: openai_key,
  });

  const openai = new OpenAIApi(config);

  let prompt;

  if (vibe === 'funny') {
    prompt =
      prompt = `From the following description: "${desc}", generate two funny ${platform} bios clearly labeled 1. and 2. for a person named ${name}.

    Make sure to throw in a joke in there and make sure to include each of the following keywords: ${keywords}. Write the bio from a ${pov} point of view and do not include any hashtags.
    The generated bio should be no less than 300 words. 
  `;
  } else {
    prompt = `From the following description: "${desc}", generate two ${vibe} ${platform} bios clearly labeled 1. and 2. for a person named ${name}.

    Make sure to include each of the following keywords: ${keywords}. Make sure to write the bio from a ${pov} point of view.
    The generated bio should be no less than 300 words. 
  `;
  }

  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 1000,
  });

  return response.data.choices[0].text?.trim();
};
