import request from 'request'


const forecast = (latitude,longitude, callback) => {
    
    const url = `http://api.weatherstack.com/current?access_key=48bf038c9651f308fb806eedc73a721b&query=${latitude},${longitude}`

    request({url,json:true},(error,{body}) => {
        if (error) {
            callback('Unable to connect to weather app!',undefined)
        }else if (body.error) {
            callback('Unable to find a location',undefined)
        }else {
            
            callback(undefined,{
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                description: body.current.weather_descriptions,
                image: body.current.weather_icons[0],
                humidity: body.current.humidity,
                
            })
        }
    })
}


export default forecast;