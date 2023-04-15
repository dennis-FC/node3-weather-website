const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=162bb340d33f371069ead441637d0a5b&query=' + latitude +',' + longitude + '&units=m'
    
    request({url,json:true},(error, {body}) => {
        if(error){
            callback("Unable to connect to weather service",undefined)
        }else if(body.error){
                callback("Unable to find location",undefined)
        }else{
            const current_tem = body.current.temperature
            const feels_tem = body.current.feelslike
        
            callback(undefined,body.current.weather_descriptions[0] + ". It is currently " + current_tem + " degress out. It feels like " + feels_tem + " degree out.")    
        }
    })
}

module.exports = forecast