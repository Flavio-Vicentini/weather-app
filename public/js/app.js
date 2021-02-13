const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mainContent = document.querySelector('.main-content')
const loadingMsg = document.querySelector('#loading-msg')
const resultMsg = document.querySelector('#result-msg')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    loadingMsg.textContent = 'Loading...'
    resultMsg.textContent = ''

    fetch(`/weather?address=${location}`).then ( (response) => {
    response.json().then((data) => {
        loadingMsg.textContent = ''
        if(data.error) {
            resultMsg.textContent = data.error     
            return
        }
            resultMsg.textContent = `${JSON.stringify(data)}` 
    })
})
})



 

