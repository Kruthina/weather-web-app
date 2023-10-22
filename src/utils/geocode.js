const request = require('request')
const geocode = (address,callback) =>
{

  const url = 'https://api.openweathermap.org/data/2.5/weather?q='+encodeURIComponent(address)+'&appid=f21dda3746d1f074fec52b74c526e1ba&units=metric'

  request({url:url,json:true},(error,{body})=>{
    
    if(error)
    {
       return callback("Unable to connect to the location services",undefined)
    }
    else if(body.cod==='404')
    {
      return callback("Unable to find location ",undefined)
    }
    else
    return callback( undefined, {

        "body":body
    })
    
      })

}

module.exports=geocode