const express = require ('express');
const morgan = require('morgan');
const data = require('./playstoreData.js')

const app = express()

app.use(morgan('common'))

app.get('/apps',(res, req) => {
    console.log('apps');
})


app.listen(8000, () => {
    console.log('Server started on PORT 8000')
})