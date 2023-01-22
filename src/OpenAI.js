const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
  apiKey: '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',
});

const openAI = new OpenAIApi(configuration);

export {openAI}