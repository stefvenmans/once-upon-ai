import { useState } from 'react';
import './App.css';
import {OpenAIApi, configuration} from "./OpenAI.js"

let conversation_static = [{q: "Hallo! Mijn naam is {insert name}, ik ben uw gids voor vandaag, u kan me alles vragen! Wat is jouw naam?", a: ""}]
let firstQuestion = true;
let personName = ""

function App() {
  // const [chatResult, setChatResult] = useState([])
  const [chatAnswer, setChatAnswer] = useState('')
  const [story, setStory] = useState('')
  const [newData, setNewData] = useState(false)

  const [conversation, setConversation] = useState([{q: conversation_static, a: ""}])
  
  console.log("component rerendered")

  // let conversationContext = [{q: "Je vroeg aan een persoon: Hoe gaat het? De persoon antwoorde: ", a: "" }]

  const  queryGPT = async (query, tokens) => {

    const openAI = new OpenAIApi(configuration);
    const res = await openAI.createCompletion({
        model: "text-davinci-003",
        prompt: query,
        max_tokens: tokens
      });
    const res_string = res.data.choices[0].text
    
    return res_string
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setNewData(false);
    let queryString = "We gaan een rollenspel doen waarij jij een gids bent van Gent, de mooiste stad van belgie, je bent een heel behulzame oude man die in het gents dialect praat. Je mag niet parafraseren. Je volgt de aangehouden structuur."

    conversation.map((it) => {
      queryString += "Je zei tegen een persoon: " 
      queryString += it.q
      queryString += "Waarop de persoon antwoorde: "
      if(it.a === ""){
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
    setChatAnswer("")
    queryGPT(queryString, 1024).then(resp => {
      // resp = resp.replace('Je zei tegen een persoon: ','')
      // resp = resp.replace('Je zegt tegen de persoon: ','')
      // resp = resp.replace('Je zegt tegen ' + personName + ': ','')
      // resp = resp.replace('Waarop de persoon antwoorde: ','')

      if (resp.search(':') > -1) {
        console.log(resp)
        resp = resp.split(':')[1]
        console.log(resp)
      }
      // if(!resp){
      //   conversation_static.push({q: "Ik ga nu een verhaaltje maken!", a: "..."})
      //   onClick()
      // }
      else conversation_static.push({q: resp, a: ""})
      
      setConversation(conversation_static)
      setNewData(true);
      if(firstQuestion){
        personName = chatAnswer
        firstQuestion = false
      }
    })
  }

  // const onClick = () => {
  //   let queryString = "Maak een verhaal waarbij de gouden draak van gent en " + personName + " iets meemaken dat elementen gebruikt uit volgende gesprek. Start direct met het verhaal. "
  //   conversation_static.map((it) => {
  //     queryString += "Je zei tegen een persoon: " 
  //     queryString += it.q
  //     queryString += "Waarop de persoon antwoorde: "
  //     if(it.a === ""){
  //       queryString += chatAnswer
  //     }
  //     else{
  //       queryString += it.a
  //     }
  //     queryString += "."
  //   })
  //   console.log("queryString : " + queryString)
  //   queryGPT(queryString, 1024).then(resp => {
  //     console.log("story: "+ resp)
  //     setStory(resp)
  //   })
  // }

  return (
    <div className="App">
      <div className='chat-containter'>
      <ul>
        {conversation_static.map((it) => (
          <>
            <li>{"Q: " + it.q}</li>
            <li>{"A: " + it.a}</li>
          </>
        ))} 
      </ul>
      </div>
      <div className='chat-input-containter'>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={chatAnswer}
          onChange={(e) => setChatAnswer(e.target.value)}
        >
        </input>
        <button>Vraag</button>
      </form>
      <div>
    </div>
    </div>


    </div>
  );
}

export default App;
