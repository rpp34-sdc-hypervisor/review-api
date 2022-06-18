const axios = require('axios');
const request = require('supertest');
const api = require('./server.js');
jest.setTimeout(10000);


describe('GET /reviews', () => {
  test('Should return a valid review', (done) => {
    request(api).get('/reviews?product_id=28930')
      .then((res) => {
        let oneRecord = JSON.parse(res.text).results[0];
        let dataPoints = Object.keys(oneRecord);
        dataPoints.forEach((lineName) => {
          expect(oneRecord[lineName]).toBeDefined();
        });
        done();
      })
      .catch((err) => {
        console.log('TEST ERROR: GET /reviews', err);
        expect({ERROR: err}).toBe('**Yay!! No Errors**');
        done();
      });
  });

  test('Should return, at max, 5 reviews if no count param provided', (done) => {

    request(api).get('/reviews?product_id=100')
      .then((res) => {
        const response = JSON.parse(res.text).results;
        expect(response.length).toBe(5);
        done();
      })
      .catch((err) => {
        console.log('TEST ERROR: GET /reviews', err);
        expect({ERROR: err}).toBe('**Yay!! No Errors**');
        done();
      });
  });

  test('Should return 10 reviews if count param is set to 10', (done) => {

    request(api).get('/reviews?product_id=30022&count=10')
      .then((res) => {
        const response = JSON.parse(res.text).results;
        expect(response.length).toBe(10);
        done();
      })
      .catch((err) => {
        console.log('TEST ERROR: GET /reviews', err);
        expect({ERROR: err}).toBe('**Yay!! No Errors**');
        done();
      });
  });

  test('Should sort by newest review if sort-param is "newest"', (done) => {
    request(api).get('/reviews?sort=newest&count=100&product_id=30022')
      .then((res) => {
        const response = JSON.parse(res.text).results;
        let prevDate = +response[0].date;
        let sorted = true;

        for (let i = 1; i < response.length; i++) {
          let currentDate = +response[i].date;
          if (currentDate > prevDate) {
            sorted = false;
            break;
          } else {
            date = currentDate;
          }
        }
        expect(sorted).toBe(true);
        done();
      })
      .catch((err) => {
        console.log('TEST ERROR: GET /reviews/newest', err);
        expect({ERROR: err}).toBe('**Yay!! No Errors**');
        done();
      });
  });

  test('Should sort by helpfulness if sort-param is "helpful"', (done) => {
    request(api).get('/reviews?sort=helpful&count=100&product_id=30022')
      .then((res) => {
        let reviews = JSON.parse(res.text).results;
        let prevHelpfulStat = reviews[0].helpfulness;
        let sorted = true;

        for (let i = 1; i < reviews.length; i++) {
          let currentHelpfulStat = reviews[i].helpfulness;
          if (currentHelpfulStat > prevHelpfulStat) {
            sorted = false;
            break;
          } else {
            date = currentHelpfulStat;
          }
        }
        expect(sorted).toBe(true);
        done();
      })
      .catch((err) => {
        console.log('TEST ERROR: GET /reviews/helpful', err);
        expect({ERROR: err}).toBe('**Yay!! No Errors**');
        done();
      });
  });

  test('Should sort by relevant if sort-param is "relevant"', (done) => {
    request(api).get('/reviews?sort=relevant&count=100&product_id=30022')
      .then((res) => {
        let reviews = JSON.parse(res.text).results;
        let prevReviewId = reviews[0].review_id;
        let sorted = true;

        for (let i = 1; i < reviews.length; i++) {
          let currentReviewId = reviews[i].review_id;
          if (currentReviewId < prevReviewId) {
            sorted = false;
            break;
          } else {
            date = currentReviewId;
          }
        }
        expect(sorted).toBe(true);
        done();
      })
      .catch((err) => {
        console.log('TEST ERROR: GET /reviews/relevant', err);
        expect({ERROR: err}).toBe('**Yay!! No Errors**');
        done();
      });
  });
});

describe('POST /reviews', () => {
  test('Should save new review to database correctly', (done) => {
    const data = {
      'product_id': 289303,
      'rating': 4,
      'summary': 'This is okie doke',
      'body': 'lsjfdj dsjflsidj ghew wefj dsljfks wqejij snd sdjsdjiwe ijsjfisjl fijsij fsijfjis wiejjg',
      'recommended': true,
      'name': 'Johny-2x',
      'email': 'johnjohn@jj.com',
      'photos': [
        'https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png'
      ],
      'characteristics': {
        '5590879': 5,
        '5590880': 5,
        '5590881': 5,
        '5590882': 5
      }
    };

    axios.post('http://localhost:8024/reviews', data)
      .then(() => {
        request(api).get('/reviews?product_id=289303&count=100')
          .then((res) => {
            let reviews = JSON.parse(res.text).results;
            let reviewAdded = reviews[reviews.length - 1];
            let expected = {
              'review_id': 5774953,
              'summary': 'This is okie doke',
              'recommend': true,
              'reported': false,
              'response': '',
              'body': 'lsjfdj dsjflsidj ghew wefj dsljfks wqejij snd sdjsdjiwe ijsjfisjl fijsij fsijfjis wiejjg',
              'date': '1654200316081',
              'reviewer_name': 'Johny-2x',
              'reviewer_email': 'johnjohn@jj.com',
              'helpfulness': 0,
              'photos': [{'id': 0, 'url': 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png'}],
              'rating': 4,
              'characteristics': {
                'Fit': {'id': '5590879', 'value': 5},
                'Length': {'id': '5590880', 'value': 5},
                'Comfort': {'id': '5590881', 'value': 5},
                'Quality': {'id': '5590882', 'value': 5}
              }
            };

            expect(reviewAdded.review_id).toBe(expected.review_id);
            expect(reviewAdded.summary).toBe(expected.summary);
            expect(reviewAdded.body).toBe(expected.body);
            expect(reviewAdded.reviewer_name).toBe(expected.reviewer_name);
            expect(reviewAdded.reviewer_email).toBe(expected.reviewer_email);
            let config = {
              method: 'delete',
              url: 'http://localhost:8024/reviews/5774953'
            };
            axios(config)
              .then(() => {
                done();
              })
              .catch((err) => {
                console.log(err);
                expect({ERROR: err}).toBe('**Yay!! No Errors**');
                done();
              });
          })
          .catch((err) => {
            console.log('TEST ERROR: GET /reviews in POST', err);
            expect({ERROR: err}).toBe('**Yay!! No Errors**');
            done();
          });
      })
      .catch((err) => {
        console.log('TEST ERROR: POST /reviews', err);
        expect({ERROR: err}).toBe('**Yay!! No Errors**');
        done();
      });
  });
});


describe('PUT /reviews/:product_id/helpful', () => {
  test('Should update heplful value for given review_id', (done) => {
    const data = {
      'product_id': 289303,
      'rating': 4,
      'summary': 'This is okie doke',
      'body': 'lsjfdj dsjflsidj ghew wefj dsljfks wqejij snd sdjsdjiwe ijsjfisjl fijsij fsijfjis wiejjg',
      'recommended': true,
      'name': 'Johny-2x',
      'email': 'johnjohn@jj.com',
      'photos': [
        'https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png'
      ],
      'characteristics': {
        '5590879': 5,
        '5590880': 5,
        '5590881': 5,
        '5590882': 5
      }
    };
    const config = {
      method: 'put',
      url: 'http://localhost:8024/reviews/5774953/helpful'
    };

    axios.post('http://localhost:8024/reviews', data)
      .then(() => {
        axios(config)
          .then(() => {
            request(api).get('/reviews?product_id=289303&sort=newest')
              .then((res) => {
                const response = JSON.parse(res.text).results;
                let index = response.length - 1;
                let lastAddedReview = response[0];
                let delConfig = {
                  method: 'delete',
                  url: 'http://localhost:8024/reviews/5774953'
                };

                axios(delConfig)
                  .then(() => {
                    expect(lastAddedReview.helpfulness).toBe(1);
                    done();
                  })
                  .catch((err) => {
                    console.log(err);
                    expect({ERROR: err}).toBe('**Yay!! No Errors**');
                    done();
                  });

              })
              .catch((err) => {
                console.log(err);
                expect({ERROR: err}).toBe('**Yay!! No Errors**');
                done();
              });
          })
          .catch((err) => {
            console.log(err);
            expect({ERROR: err}).toBe('**Yay!! No Errors**');
            done();
          });
      });
  });
});

describe('PUT /reviews/:product_id/report', () => {
  test('Should report a review for a given review_id', (done) => {
    const data = {
      'product_id': 289303,
      'rating': 4,
      'summary': 'This is okie doke',
      'body': 'lsjfdj dsjflsidj ghew wefj dsljfks wqejij snd sdjsdjiwe ijsjfisjl fijsij fsijfjis wiejjg',
      'recommended': true,
      'name': 'Johny-2x',
      'email': 'johnjohn@jj.com',
      'photos': [
        'https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png'
      ],
      'characteristics': {
        '5590879': 5,
        '5590880': 5,
        '5590881': 5,
        '5590882': 5
      }
    };
    const config = {
      method: 'put',
      url: 'http://localhost:8024/reviews/5774953/report'
    };

    axios.post('http://localhost:8024/reviews', data)
      .then(() => {
        axios(config)
          .then(() => {
            request(api).get('/reviews?product_id=289303&sort=newest')
              .then((res) => {
                const response = JSON.parse(res.text).results;
                let index = response.length - 1;
                let lastAddedReview = response[0];
                let delConfig = {
                  method: 'delete',
                  url: 'http://localhost:8024/reviews/5774953'
                };

                axios(delConfig)
                  .then(() => {
                    expect(lastAddedReview.reported).toBe(true);
                    done();
                  })
                  .catch((err) => {
                    console.log(err);
                    expect({ERROR: err}).toBe('**Yay!! No Errors**');
                    done();
                  });

              })
              .catch((err) => {
                console.log(err);
                expect({ERROR: err}).toBe('**Yay!! No Errors**');
                done();
              });
          })
          .catch((err) => {
            console.log(err);
            expect({ERROR: err}).toBe('**Yay!! No Errors**');
            done();
          });
      });
  });
});