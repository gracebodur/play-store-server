const express = require ('express');
const morgan = require('morgan');
const datas = require('./playstoreData.js')
const cors = require('cors')

const app = express()

app.use(morgan('common'))
app.use(cors())

app.get('/apps',(req, res) => {
    // res.json(data)
    const {sort, genres} = req.query

    // if(!search)

    if(sort) {
        if(!['Rating', 'App'].includes(sort)) {
            return res  
                .status(400)
                .send('Please add Rating or App as a sorting type')
        }
    }


    if(genres) {
        if(
        !['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)) {
            return res
            .status(400)
            .send('Genres must include one of each: Action, Puzzle, Strategy, Casual, Arcade, Card')
        }
    }

    let results = datas
    
    
    // .filter(data =>
    //     {
    //     return data.Genres.toLowerCase().includes()
    //     }
    // )
    //         // app
    //         // .toLowerCase()
    //         // .includes(app.toLowerCase()))

    if(sort === 'App') {
        results.sort((a,b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        })
    }

    if(sort === 'Rating') {
        results.sort((a,b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
        })
    }

    if(genres){
        results = results.filter(result => {
            return result.Genres === genres
        });
    }

 res.json(results)
})

module.exports = app

// app.listen(8000, () => {
//     console.log('Server started on PORT 8000')
// })

