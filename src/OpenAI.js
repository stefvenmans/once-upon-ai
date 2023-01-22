const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
  apiKey: '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'
});

//const openAI = new OpenAIApi(configuration);

export {OpenAIApi, configuration}