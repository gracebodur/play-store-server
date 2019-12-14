const express = require ('express');
const morgan = require('morgan');
const datas = require('./playstoreData.js')

const app = express()

app.use(morgan('common'))

app.get('/apps',(req, res) => {
    // res.json(data)
    const { sort = ''} = req.query
    // const App = data.sort(App)

    if(sort) {
        if(!['Rating', 'App'].includes(sort)) {
            return res  
                .status(400)
                .send('Please add Rating or App as a sorting type')
        }
    }

    let results = datas.filter(data =>
        {
        return data.App.toLowerCase().includes(data.toLowerCase())
        }
    )
            // app
            // .toLowerCase()
            // .includes(app.toLowerCase()))

    if(sort === 'App') {
        results.sort((a,b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        })
    }

 res.json(results)
})


app.listen(8000, () => {
    console.log('Server started on PORT 8000')
})
