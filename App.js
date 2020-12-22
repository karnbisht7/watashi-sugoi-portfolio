const express = require('express')
const mongoose = require("mongoose")
const app = express()
const {MONGOURI} = require('./keys')
const PORT = 3000
const bodyParser = require('body-parser')


require('./models/cart')


mongoose.connect(MONGOURI , {
                  useNewUrlParser : true ,
                  useUnifiedTopology : true }   )
mongoose.connection.on('connected' , ()=> {
    console.log("mongoDB in the house baeebayyyyy!!!")
})
mongoose.connection.on('error' , ()=> {
    console.log("some niggas trynna block mongoDB from the party bro , gotta do somethin!! ")
})


require('./models/user')

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(express.json())
app.use(require('./routes/auth'))




app.listen(PORT || process.env.PORT , ()=> console.log("yeah we are up and running baby !"))