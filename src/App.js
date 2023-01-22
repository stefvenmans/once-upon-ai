import { queries } from '@testing-library/react';
import { useState } from 'react';
import './App.css';
import {OpenAIApi, configuration} from "./OpenAI.js"
import { PhotePage } from './PhotePage';
 
let conversation_static = [{q: "Hoe gaat het?", a: ""}]

function App() {
  const [chatResult, setChatResult] = useState([])
  const [chatAnswer, setChatAnswer] = useState('')
  const [story, setStory] = useState('')
  const [newData, setNewData] = useState(false)

  let index = 0
  const [conversation, setConversation] = useState([{q: "Hoe gaat het?", a: ""}])
  
  console.log("component rerendered")


  let conversationContext = [{q: "Je vroeg aan een persoon: Hoe gaat het? De persoon antwoorde: ", a: "" }]

  const  queryGPT = async (query, tokens) => {

    const openAI = new OpenAIApi(configuration);
    const res = await openAI.createCompletion({
        model: "text-davinci-003",
        prompt: query,
        max_tokens: tokens
      });
    //console.log(res.data.choices[0].text)
    const res_string = res.data.choices[0].text
    
    return res_string
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setNewData(false);
    let queryString = ""
    conversation.map((it) => {
      queryString += "Je zei tegen een persoon: " 
      queryString += it.q
      queryString += "Waarop de persoon antwoorde: "
      if(it.a == ""){
        queryString += chatAnswer
      }
      else{
        queryString += it.a
      }
      queryString += "."
    })
    console.log(queryString)
    conversation_static[conversation_static.length-1].a = chatAnswer

    console.log(conversation_static.length)
    console.log(conversation_static)

    queryGPT(queryString, 100).then(resp => {
      conversation_static.push({q: resp, a: ""})
      console.log("resp: " + resp)
      console.log(conversation_static)
      console.log(conversation)
      setNewData(true);
      //setConversation(conversation_static)

      
      
      
      
      //console.log(conversation_static)
    })
    
    //conversation_static.push({q: res, a: ""})
    //setConversation(conversation_static)
  }

  const onClick = () => {
    let queryString = ""
    conversation_static.map((it) => {
      queryString += "Je zei tegen een persoon: " 
      queryString += it.q
      queryString += "Waarop de persoon antwoorde: "
      if(it.a == ""){
        queryString += chatAnswer
      }
      else{
        queryString += it.a
      }
      queryString += "."
    })
    console.log("queryString : " + queryString)
    queryGPT("Maak een verhaal van het volgende gesprek." + queryString, 300).then(resp => {
      console.log("story: "+ resp)
      setStory(resp)
    })
  }

  return (
    <div className="App">
      <ul>
        {conversation_static.map((it) => (
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

      <PhotePage/>

      <button onClick={onClick}>Maak een verhaal</button>
      <p>{story}</p>
    </div>
  );
}

export default App;
