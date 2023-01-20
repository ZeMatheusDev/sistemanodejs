const request = require('supertest')
const app = require('./app')

describe('Testando App server', () => {
    test('responds to /', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toBe(200)
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.redirect).toBe(false)
    })

    test('responds to /', async () => {
        const res = await request(app).get('/logar');
        expect(res.statusCode).toBe(404)
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.redirect).toBe(false)
    })

    test('responds to /', async () => {
        const res = await request(app).get('/admin');
        console.log(res.statusCode);
        expect(res.statusCode).toBe(200)
        expect(res.header['content-type']).toBe('text/html; charset=utf-8');
        expect(res.redirect).toBe(false)
    })

});
