const { Configuration, OpenAIApi } = require("openai");
  const configuration = new Configuration({
  apiKey: '' // Add your API key here
});

//const openAI = new OpenAIApi(configuration);

export {OpenAIApi, configuration}