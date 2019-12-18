const expect = require('chai').expect
const app = require('../app')
const supertest = require('supertest')

//Make a request to GET /apps X
//Confirm that the response status is 200 X
//Confirm that we got an array as a response body X
//Confirm that the first item of the array has a 'title

// supertest(app)

describe('Playstore', () => {
    describe('GET /apps', () => {
        it('should return an array of apps', () => {
            return supertest(app)
                .get('/apps')
                .expect(200)
                .expect('Content-Type', /json/)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body).to.have.lengthOf.at.least(1)
                    const app =res.body[0]
                    expect(app).to.include.all.keys('App', 'Rating', 'Genres')
                })
        })

        // it('should be 400 if sort is incorrect', () => {
        //     return supertest(app)
        //     .get('./apps')
        //     .query({ sort: 'WRONG'})
        //     .expect(400, 'Please add Rating or App as a sorting type')
        // })

        // it('should be 400 if genres is incorrect', () => {
        //     return supertest(app)
        //     .get('./apps')
        //     .query({ genres: 'WRONG'})
        //     .expect(400, 'Genres must include one of each: Action, Puzzle, Strategy, Casual, Arcade, Card')
        // })


        it('GET /apps returns sorted array of ratings in descending order', () => {
            return supertest(app)
            .get('/apps')
            .query({ sort: 'Rating'})
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
                let i = 0
                let sorted = true
                while(sorted && i < res.body.length - 1) {
                    sorted = sorted && res.body[i].Rating <= res.body[i + 1].Rating
                    i++
                }
                expect(sorted).to.be.true
            })
        })
            it('GET /apps returns sorted array of apps in alphabetical order', () => {
                return supertest(app)
                .get('/apps')
                .query({ sort: 'App'})
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    let i = 0
                    let sorted = true
                    while(sorted && i < res.body.length - 1) {
                        sorted = sorted && res.body[i].App <= res.body[i + 1].App
                        i++
                    }
                    expect(sorted).to.be.true
                })
        })
        it('should filter by genres', () => {
            return supertest(app)
            .get('/apps')
            .query({ genres: 'Action'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                const results = res.body
                results.forEach( app => {
                    expect(app['Genres']).to.have.string('Action')
                })
            }
            )
        })
    })
})
