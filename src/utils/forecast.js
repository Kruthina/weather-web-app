const request = require('request')
const forecast = (longitude,latitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=da16c88cd2a721c33743f0e2a8184093&query='+latitude+','+longitude+'&units=f'

    request({url, json:true},(error ,{body})=>{
 
    if(error)
    {
        callback("Unable to connect to the weather api",undefined)
    }
    else if(body.error)
    {
       callback("Unable to find location",undefined)
       
    }
    else{
    callback(undefined,
        body.current.weather_descriptions[0]
    )
    }
    })
}

module.exports = forecast