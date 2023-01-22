const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
  apiKey: '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'
});

//const openAI = new OpenAIApi(configuration);

export {OpenAIApi, configuration}