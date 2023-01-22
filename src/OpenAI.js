const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

export {openai}