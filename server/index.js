const express = require("express");
const path = require("path")
const cors = require("cors");
require ("dotenv").config()
const port=process.env.PORT||process.env.SERVER_PORT

const { request } = require("express");


const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.use(express.static(path.join(__dirname, '../client')))

app.listen(port, ()=>{
  console.log("Listening on port "+port)
})

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: 'e8d844be5b5b4676bc843f8740851f41',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

rollbar.log('Hello world!!!')

app.get('/', (req,res)=>{
  
  res.sendFile(path.join(__dirname,'../client/index.html'))
  rollbar.info("HTML file was linked successfully")
})

app.get("/api/test", (req,res)=>{
  try {
    nonExistentFunction();
  } catch (err) {
    console.error(err);
    rollbar.errorHandler("Function does not exist")
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }  
})


app.get("/api/compliment", (req, res) => {
  rollbar.info("User just got a random compliment")
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
  rollbar.info("User just got a random fortune")
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
  rollbar.info("User just added a new motivation phrase")
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

  rollbar.info(`User just updated phrase #${idToUpdate}`)
})


//new endpoind
let updatesAfterDelete = updates
app.delete(`/api/delete/:OurParam`,(req,res)=>{
  let idToDelete = parseInt(req.params.OurParam)
  console.log(idToDelete)
  
  updatesAfterDelete.splice((idToDelete-1),1)
  
  
  res.status(200).send(updatesAfterDelete)

  rollbar.info(`User just deleted phrase #${idToDelete-1}`)

  console.log(updatesAfterDelete)
})


app.get("/api/test", (req,res)=>{

  try {
    nonExistentFunction();
  } catch (err) {
    res.status(400).send("Hit the catch block")
    
    rollbar.error("Function does not exist")
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }
  
})



//app.listen(4000, () => console.log("Server running on 4000"));



