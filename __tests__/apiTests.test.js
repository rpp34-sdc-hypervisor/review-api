const request = require('supertest');

describe('Review', () => {
    let app;
    beforeEach(async () => {
        app = require('../server');
    })

    afterEach(async () => {
        await app.close();
    })
    it("returns 400 if product_id is NOT in params",  (done) => {
        request(app)
          .get('/reviews')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400, done);
    });

    it("returns 200 if product_id is not in params",  (done) => {
        const product_id = 71719;
        request(app)
          .get(`/reviews?product_id=${product_id}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.results.length).toEqual(1);
            return done();
          });
    });

    it("returns empty result if product_id is not in DB",  (done) => {
        const product_id = 100;
        request(app)
          .get(`/reviews?product_id=${product_id}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.results.length).toEqual(0);
            return done();
          });
    });
})