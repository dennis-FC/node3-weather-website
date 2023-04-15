const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define paths for express config
const PublicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Set up handlebars engine and view location
app.set('view engine', 'hbs') //template engine (handlebar set up)
app.set('views',viewsPath) //change dir which express look hbs, we customize the dir, whcih default dir is view
hbs.registerPartials(partialPath)

//Set up directory to serve
app.use(express.static(PublicDirectoryPath))

// app.get('',(req,res) => {
//     res.send('<h1>Weather</h1>')
// })

app.get('',(req,res) => {
    res.render('index',{
        title:'Weather APP',
        name: 'Dennis'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title:'About me',
        name:'Mail'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        msg:'help page',
        title:'Help',
        name:'Nancy'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'The address is necessary'
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forcastdata) => {
            if(error){
                return res.send({error})
            }
            
            res.send({
                forecast:forcastdata,
                location,
                address:req.query.address
            })
            
          })
    })
    
})


app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        product:[]
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title: '404',
        errorMsg: 'Help article not found',
        name: 'dennis'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title:'404',
        errorMsg: 'Page not found',
        name:'dennis'
    })
})


app.listen(3000,() =>{
    console.log('server is up on port 3000')
})