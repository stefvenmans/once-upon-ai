const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
  apiKey: ''
});

//const openAI = new OpenAIApi(configuration);

export {OpenAIApi, configuration}