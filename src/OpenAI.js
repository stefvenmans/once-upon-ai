const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
  apiKey: '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'
});

//const openAI = new OpenAIApi(configuration);

export {OpenAIApi, configuration}