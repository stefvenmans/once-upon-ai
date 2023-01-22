import { useState } from 'react';
import './App.css';
import {OpenAIApi, configuration} from "./OpenAI.js"

let conversation_static = [{q: "Hey! Ik ben de Gentse Goude Draak! Wat is jouw naam?", a: ""}]
let show_images = [false, false, false, false, false]
let firstQuestion = true;
let personName = ""

function App() {
  const image_objs = ['fiets', 'koffie', 'gsm', 'bloemen', 'feest']
  const [chatResult, setChatResult] = useState([])
  const [chatAnswer, setChatAnswer] = useState('')
  const [story, setStory] = useState('')
  const [newData, setNewData] = useState(false)

  let index = 0

  const width = 150
  const height = 150

  function alterShowImages(answer) {
    for (let i = 0; i < image_objs.length; i++) {
      console.log(image_objs[i])
      console.log(answer.search(image_objs[i]))
      if (!show_images[i] && answer.search(image_objs[i])>-1) {
        show_images[i] = true
        setNewData(!newData)
        break
      }
    }
    console.log(answer)
    console.log(show_images)
  }


  const [conversation, setConversation] = useState([{q: "Hey! Ik ben de Gentse Goude Draak! Wat is jouw naam?", a: ""}])
  
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
    let queryString = "We gaan een rollenspel doen waarij jij een schattige goude draak bent die vragen stelt aan een persoon. Je mag niet parafraseren. Je volgt de aangehouden structuur."

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

    queryGPT(queryString, 500).then(resp => {
      // resp = resp.replace('Je zei tegen een persoon: ','')
      // resp = resp.replace('Je zegt tegen de persoon: ','')
      // resp = resp.replace('Je zegt tegen ' + personName + ': ','')
      // resp = resp.replace('Waarop de persoon antwoorde: ','')

      if (resp.search(':') > -1) {
        // console.log("found ':'")
        // alert("found ':'")
        console.log(resp)
        resp = resp.split(':')[1]
        console.log(resp)
      }

      conversation_static.push({q: resp, a: ""})
      
      // console.log(conversation_static)
      // console.log(conversation)
      alterShowImages(resp)
      setConversation(conversation_static)
      setNewData(true);
      if(firstQuestion){
        personName = chatAnswer
        firstQuestion = false
      }
    })
  }

  const onClick = () => {
    let queryString = "Maak een verhaal waarbij de gouden draak van gent en " + personName + " iets meemaken dat elementen gebruikt uit volgende gesprek. "
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
    queryGPT(queryString, 500).then(resp => {
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

      <button onClick={onClick}>Maak een verhaal</button>
      <p>{story}</p>

      <div>
      {show_images[0] && <img src={require('./images/'+ image_objs[0] +'.jpg')} width={width} height={height} alt="image not found"/>}
      {show_images[1] && <img src={require('./images/'+ image_objs[1] +'.jpg')} width={width} height={height} alt="image not found"/>}
      {show_images[2] && <img src={require('./images/'+ image_objs[2] +'.jpg')} width={width} height={height} alt="image not found"/>}
      {show_images[3] && <img src={require('./images/'+ image_objs[3] +'.jpg')} width={width} height={height} alt="image not found"/>}
      {show_images[4] && <img src={require('./images/'+ image_objs[4] +'.jpg')} width={width} height={height} alt="image not found"/>}
    </div>


    </div>
  );
}

export default App;
