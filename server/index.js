const express = require("express");
const path = require("path")
const cors = require("cors");
require ("dotenv").config()
const port=process.env.PORT||process.env.SERVER_PORT

const { request } = require("express");


const app = express();

app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname,'../index.html'))
})

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.use('/js', express.static(path.join(__dirname, 'client/main.js')))

app.listen(port, ()=>{
  console.log("Listening on port "+port)
})


app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});


app.get("/api/fortune", (req, res) => {
  const fortunes = ["A beautiful, smart, and loving person will be coming into your life.",
					 "A dubious friend may be an enemy in camouflage.",
					 "A faithful friend is a strong defense.",
           "A fresh start will put you on your way.",
					 "A friend asks only for your time not your money"
  ];

 
  let randomIndex = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex];

  res.status(200).send(randomFortune);
  
});


let phrases = []

app.post('/api/phrase', (req, res) => {
  console.log(req.body)
  const { Phrase } = req.body
  phrases.push(Phrase)
  res.status(200).send(phrases)
})

//new endpoint
let updates = phrases
app.put('/api/updates',(req,res)=>{
 
  const {newPhrase,idToUpdate}=req.body
  
  updates.splice((parseInt(idToUpdate)-1),1,newPhrase)
  console.log(updates)
  res.status(200).send(updates)
})


//new endpoind
let updatesAfterDelete = updates
app.delete(`/api/delete/:OurParam`,(req,res)=>{
  let idToDelete = parseInt(req.params.OurParam)
  console.log(idToDelete)
  
  updatesAfterDelete.splice((idToDelete-1),1)
  
  
  res.status(200).send(updatesAfterDelete)
  console.log(updatesAfterDelete)
})



app.listen(4000, () => console.log("Server running on 4000"));
