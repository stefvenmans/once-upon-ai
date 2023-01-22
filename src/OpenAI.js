const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
  apiKey: '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'
});

//const openAI = new OpenAIApi(configuration);

export {OpenAIApi, configuration}