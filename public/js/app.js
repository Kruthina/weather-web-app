//console.log('Client side javascript has been loaded')



const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
const messagethree = document.querySelector('#message-3')
const messagefour = document.querySelector('#message-4')
const messagefive = document.querySelector('#message-5')
//messageone.textContent = 'from javas'
weatherform.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value
     messageone.textContent='Loading...'
     messagetwo.textContent='Loading...'
     messagethree.textContent='Loading...'
     messagefour.textContent='Loading...'
     

fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{

        if(data.error)
        {
            messagefive.textContent = data.error
        }
        else
        {
           
            messageone.textContent = data.weather
            messagetwo.textContent=  data.temp
            messagethree.textContent = data.humidity
            messagefour.textContent=  data.feels_like
            messagefive.textContent='No Error Enjoy!!!'

        }
                
    })
})

})