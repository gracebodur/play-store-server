const expect = require('chai').expect
const app = require('../app')
const request = require('supertest')

//Make a request to GET /apps X
//Confirm that the response status is 200 X
//Confirm that we got an array as a response body X
//Confirm that the first item of the array has a 'title

// supertest(app)

describe('Playstore', () => {
    describe('GET /apps', () => {
        it('should return an array of apps', () => {
            return request(app)
                .get('/apps')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                })
        })
        it('GET /apps returns sorted array of ratings in descending order', () => {
            return request(app)
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
                return request(app)
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
        it('GET /apps returns sorted array of genres based on the query', () => {
            return request(app)
            .get('/apps')
            .query({ genres: ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'] })
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect({a: 1}).to.include.any.keys('a', 'b')
                expect(genres).to.be.true
            }
            )
        })
    })
})
