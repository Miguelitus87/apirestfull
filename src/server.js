const express = require('express')
const app = express()

const generalRoutes = require('./routes/index.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', generalRoutes)

const PORT = process.env.PORT || 8080
app.listen(PORT,(req,res)=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})
.on('error',(error)=>console.log(error))