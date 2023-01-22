const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
  apiKey: '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'
});

//const openAI = new OpenAIApi(configuration);

export {OpenAIApi, configuration}