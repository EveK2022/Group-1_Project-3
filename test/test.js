const chai = require('chai');
const server = "http://localhost:3000";
const chaiHttp = require('chai-http');
const { describe } = require('mocha');
const expect = require("chai").expect;
const request = require("supertest", "request");
var should = chai.should();
const { Location } = require("../models");

chai.use(chaiHttp);


describe("LOCATIONS", () => {
  describe('/GET all restaurant locations', () => {
    it('should return 200 OK with all restaurant', async () => {
      const res = await request(`${server}`) 
        .get(`/public/location`)
        .expect(200)

      const locations = res.body;
        expect(locations).to.be.an('object');
    })

    it('should have all restaurant details', async () => {
      const res = await request(`${server}`) 
        .get(`/public/location`)
        .expect(200);

      const locations = res.body;
      expect(locations).to.be.an('object');

      Array.from(locations).forEach(location => {
        expect(location.name).to.be.a("string");
        expect(location.address).to.be.a("string");
        expect(location.located_at).to.be.a("string");
        expect(location.cuisineId).to.be.a("string");
        expect(location.priceId).to.be.a("string");
        expect(location.openingHour).to.be.a("string");
        expect(location.image).to.be.a("string");
      })
    })
  })
})


describe("USERS", () => {
  describe('/GET all user content', () => {
    it("should list all users", async () => {
      const res = await request(`${server}`)
        .get(`/login/user`) 
        .expect(200);


      const users = res.body; 
      expect(users).to.be.an('object');

      Array.from(users).forEach(user => {
        expect(user.username).to.be.a("string");
        expect(user.email).to.be.a("string");
        expect(user.password).to.be.a("string");
          
      });
    });
  });

  // describe("/POST a new user", () => {
  //   it("it should Register a new user", async (done) => {
  //     let myNewuser = {
  //       "username": "Nancy",
  //       "email": "nancy@hotmail.com",
  //       "password": "12345"
  //     };
  //     chai.request(server)
  //       .post("/login/signup")
  //       .send(myNewuser)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a("object");
  //         res.body.should.have
  //           .property("message")
  //           .eql("New user is created!");
  //         })
  //     done();
  //   });
  // });

  describe("/POST a signin user", () => {
    it("it should be A SUCCESSFUL SIGNIN and ISSUE JWT token",  (done) => {
      chai.request(server)
        .post("/login/signin")
        .send({
          "username":"Annie",
          "password":"12345"
        })
        .end((err, res) => {
          //console.log("CHECK IS USER IN THE DATABASE");
          res.should.have.status(200);
          res.body.should.have.a("object");
          res.body.should.have.property('id');
          res.body.should.have.property('username');
          res.body.should.have.property('email');
          res.body.should.have.property('accessToken');
        })
      done();
    });
  });

  describe("/POST a signin user", () => {
    it("it should BE AN UNSUCCESSFUL LOGIN user",  (done) => {
      request(server)
        .post("/login/signin")
        .send({
          "username":"Valerie",
          "password":"12345"
        })
        .set('Accept', 'application/json')
        .expect(404)
        .expect('Content-Type', /json/)
        .expect('message: User Not found')
        .end((err, res) => {
          //console.log("CHECK IS USER IN THE DATABASE");
          res.should.have.status(404);
        })
      done();
    });
  });
})

describe("REVIEWS", () => {
  describe('/GET all reviews', () => {
    it("should list all review contents", async () => {
      await request(`${server}/public/review`,
        (err, res, body) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('object');
          
        }
      );
    });
  });

  // describe("/POST review", () => {
  //   it("it should POST a review", (done) => {
  //     let myreview = {
  //       "location_id": 9,
  //       "user_id": 14,
  //       "review": "Authentic Korean food.  Nice environment to dine in.",
  //     };
  //     chai.request(server)
  //       .post("/user/newreview")
  //       .send(myreview)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a("object");
  //         res.body.should.have
  //           .property("message")
  //           .eql("Update successful");
  //       done();
  //     });
  //   });
  // });
});


// describe("/POST a restaurant location", () => {
//   it("it should POST a new restaurant location", (done) => {
//     let myRestaurant = {
//       "name": "Superstar K",
//       "address": "75 Tanjong Pagar Road Singapore 088496",
//       "located_at": "South",
//       "cuisineId": "Korean",
//       "priceId": "$$$",
//       "openingHour": "11am to 2am",
//       "image": "https://sethlui.com/wp-content/uploads/2014/11/supper-listicle-14.jpg"
//     };
//     chai.request(server)
//       .post("/user/newlocation")
//       .send(myRestaurant)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("object");
//         res.body.should.have
//           .property("message")
//           .eql("Update successful");
//       done();
//       console.log(myRestaurant)
//     });
//   });
// });

// ************************** this is not working *******************************************
// describe('/GET location/:id', () => {
//   it('should query one individual restaurant', (done) => {
//     let location = new Location (
//       {
//         "name": "Nana Original Thai Food",
//         "address": "18 Clementi Road Singapore 129747",
//         "located_at": "West",
//         "cuisineId": "Thai",
//         "priceId": "$$",
//         "openingHour": "24 hours",
//         "image": "https://placesingapore.com/uploads/webp/feature-nana-original-thai-food-singapore-fd12131.webp"
//       }
//     );
//     location.save((err, location) => {
//       chai.request(server) 
//         .get('/user/location/'+location.id)
//         .send(location)
//         .end((err, res) => {
//           res.body.should.have.property('name');
//           res.body.should.have.property('address');
//           res.body.should.have.property('located_at');
//           res.body.should.have.property('cuisineId');
//           res.body.should.have.property('priceId');
//           res.body.should.have.property('openingHour');
//           res.body.should.have.property('image');
//           res.body.should.have.property('createdAt');
//           res.body.should.have.property('updatedAt');
//           res.body.should.have.property('_id').eql(location.id);
//         done();
//       })
//     })
//   })
// })