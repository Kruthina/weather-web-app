const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

//using path default node module to set path variables
const publicdirectorypath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../public/templates/views')
const partialpath = path.join(__dirname,'../public/templates/partials')


//set handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)



//set static directory to serve
app.use(express.static(publicdirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        msg:"Use this site to get to know about weather ",
        name:'Nilesh Verma'
        
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        msg:"This page is there to help u",
        name:'Nilesh Verma'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Nilesh Verma'
    })
})


app.get('/weather',(req,res)=>{
    
    if(!req.query.address)
    {
       return res.send({
            msg:"plzz provide an address"
        })
    }

        geocode(req.query.address,(error,{body}={})=>{

            if(error)
            return res.send({error})
           
            //console.log(body.weather[0].main)
            res.send({
              weather: body.weather[0].main,
              temp:body.main.temp,
              humidity:body.main.humidity,
              feels_like:body.main.feels_like
            })
        
        

        
        })
        
    
})


app.get('/product',(req,res)=>{

     if(!req.query.search)
     {
        return res.send({msg:'Plz provide a search term'})
     }
    
    res.send({
       product:[]
    })
})


app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:"404",
        errmsg:"Help article not found",
        name:'Nilesh Verma'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:"404",
        errmsg:'Page not found',
        name:'Nilesh Verma'

    })
})


app.listen(port,()=>{
    console.log("Server is up on port "+port)
})