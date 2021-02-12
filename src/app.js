import path from 'path'
import express from 'express'
import hbs from 'hbs'
import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'


const app = express()

// Define paths for Express configs
const __dirname = path.resolve()
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup public directory to serve
app.use(express.static(publicDirectoryPath))


app.get ('', (req, res) => {
    res.render('index', {
        title: 'Weather'
    })
})

app.get ('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    })
})

app.get ('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})



app.get ('/weather', (req, res) => {

    res.set({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });

    if (!req.query.address){
        return res.send ({
            error: 'You must provide an address.'
        })
    }

    const address = req.query.address
  
    geocode(address, (error,{latitude,longitude,location}={}) => {
        if (error) {
            return res.send ({
                error
            })
        }
         forecast(latitude,longitude, (error,dataForecast) => {
             if (error) {
                return res.send ({
                    error
                })
             }
             res.send({
                location,
                forecast:dataForecast
            })  
         })
     })
     

})

app.get ('*', (req, res) => {
    res.render('404',{
        title: '404',
       errorMessage: 'Page not found.'
    })
})


app.listen(3000, () => {
    console.log('Server running on port 3000')
})