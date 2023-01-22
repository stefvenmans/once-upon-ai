const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
  apiKey: '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'
});

//const openAI = new OpenAIApi(configuration);

export {OpenAIApi, configuration}