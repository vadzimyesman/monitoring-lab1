const pContainer = document.querySelector('#div1')

document.getElementById("complimentButton").onclick = function () {
    axios.get("http://localhost:4000/api/compliment/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
  };

  document.getElementById("fortuneButton").onclick = function () {
    axios.get("http://localhost:4000/api/fortune/")
        .then(function (response) {
          const data = response.data;
          alert(data);
        });
  };

//new request
  const createPhrase = (event)=>{
    event.preventDefault()
    let phraseInput=document.querySelector("#input1")
    let body = {
        Phrase: phraseInput.value
    }

    axios.post(`http://localhost:4000/api/phrase`,body).then((res)=>{
        console.log(res.data)
      
           
            let child=document.createElement('p')
            child.textContent=res.data[res.data.length-1]
            pContainer.appendChild(child)         
        
     
        
        phraseInput.value=""
        
    })
    

}

document.getElementById('create-form').addEventListener("submit", createPhrase)

//new request

const updatePhrase = (event)=>{
    event.preventDefault()
    let phraseInput=document.querySelector("#input2")
    let idInput=document.querySelector("#input3")
    let body = {
        newPhrase: phraseInput.value,
        idToUpdate: idInput.value

    }

    axios.put(`http://localhost:4000/api/updates`,body).then((res)=>{
        console.log(res.data)
      
            pContainer.innerHTML = ""
            
            for (i=0;i<res.data.length;i++){
            let child=document.createElement('p')
            child.textContent=res.data[i]
            pContainer.appendChild(child)
            }
            
        
            phraseInput.value=""
            idInput.value=""

        //console.log(pContainer)
        
    })

}

document.getElementById('update-form').addEventListener("submit", updatePhrase)

//newRequest

const deletePhrase = (event)=>{
    event.preventDefault()
    
    let idToDisplay = document.querySelector("#input4")
    let idToDelete = idToDisplay.value

    axios.delete(`http://localhost:4000/api/delete/${idToDelete}`).then((res)=>{
        console.log(res.data)
      
            pContainer.innerHTML = ""
            
            for (i=0;i<res.data.length;i++){
            let child=document.createElement('p')
            child.textContent=res.data[i]
            pContainer.appendChild(child)
            }
            
        
        idToDisplay.value=""   
        console.log(pContainer)
        
        
    })

    

}

document.getElementById('delete-form').addEventListener("submit", deletePhrase)













  

