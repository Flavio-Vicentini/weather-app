const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const mainContent = document.querySelector('.main-content')
const loadingMsg = document.querySelector('#loading-msg')
const resultMsg = document.querySelector('#result-msg')
const imgResult = document.querySelector('img')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    loadingMsg.textContent = 'Loading...'
    resultMsg.textContent = ''
    imgResult.src = ''

    fetch(`/weather?address=${location}`).then ( (response) => {
    response.json().then((data) => {
        loadingMsg.textContent = ''
        
        if(data.error) {
            resultMsg.textContent = data.error     
            return
        }
            console.log(data)
            imgResult.src = data.forecast.image
            resultMsg.innerHTML = `<p>${data.location}</p> 
            <p>Temperature: ${data.forecast.temperature}°C</p> 
            <p>Humidity: ${data.forecast.humidity}% </p> 
            <p>Feelslike: ${data.forecast.feelslike}°C</p>` 
    })
})
})



 

