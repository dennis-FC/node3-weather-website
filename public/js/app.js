console.log("Client side javascript is loaded.")


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
//messageOne.textContent = 'aa'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //default will refresh when submit, but we want to stay

    const location = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        }else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})