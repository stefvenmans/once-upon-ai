import { queries } from '@testing-library/react';
import { useState } from 'react';
import './App.css';
import {openai} from "./OpenAI.js"
 
function App() {
  const [chatResult, setChatResult] = useState([])
  const [chatAnswer, setChatAnswer] = useState('')

  let index = 0
  const [conversation, setConversation] = useState([{q: "Hoe gaat het?", a: ""}])
  let conversation_static = [{q: "Hoe gaat het?", a: ""}]
  let conversationContext = [{q: "Je vroeg aan een persoon: Hoe gaat het? De persoon antwoorde: ", a: "" }]

  const  queryGPT = async (query, tokens) => {
    const res = openai.createCompletion({
        model: "text-davinci-003",
        prompt: query,
        max_tokens: tokens
      });
    console.log(res.data.choices[0].text)
    const res_string = await res.data.choices[0].text
    return res_string
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let queryString = ""
    conversation.map((it) => {
      queryString += "Je zei tegen een persoon: " 
      queryString += it.q
      queryString += "De persoon antwoorde: "
      queryString += chatAnswer
      queryString += "."
    })
    console.log(queryString)
    conversation_static[conversation_static.length-1].a = chatAnswer
    const res = queryGPT(queryString, 100).then(console.log(res));
    conversation_static.push({q: res, a: ""})
    setConversation(conversation_static)
  }

  return (
    <div className="App">
      <ul>
        {conversation.map((it) => (
          <>
            <li>{"Q: " + it.q}</li>
            <li>{"A: " + it.a}</li>
          </>
        ))} 
      </ul>


      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setChatAnswer(e.target.value)}
        >
        </input>
        <button>Vraag</button>
      </form>
    </div>
  );
}

export default App;
