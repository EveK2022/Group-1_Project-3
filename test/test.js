const chai = require('chai');
const server = "http://localhost:3000";
const chaiHttp = require('chai-http');
const { describe } = require('mocha');
const expect = require("chai").expect;
const request = require("request");
var should = chai.should();

chai.use(chaiHttp);

describe('/GET Loading page', () => {
  it("Main page content", (done) => {
    request(server, (err, res, body) => {
      res.should.have.status(200);
      done();
    });
  });
});

describe('/GET all restaurant locations', () => {
  it('Location page content', (done) => {
    request(`${server}/public/location`, 
    (err, res) => {
        res.should.have.status(200);
        //res.body.should.be.a('object');
        done();
      })
    })
})

describe('/GET all user content', () => {
  it("List of User page content", (done) => {
    request(`${server}/login/user`, 
    (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      }
    );
  });
});

// describe("/POST a new user", () => {
//   it("it should Register a new user, Login user, check token", (done) => {
//     let myNewuser = {
//       "username": "Tom",
//       "email": "tom@hotmail.com",
//       "password": "tom12345",
//     };
//     chai.request(server)
//       .post("/login/signup")
//       .send(myNewuser)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("object");
//         res.body.should.have
//           .property("message")
//           .eql("New user is created!")

//         chai.request(server)
//           .post("/login/signin")
//           .send({
//             "username":"Tom",
//             "password":"tom12345"
//           })
//           .end((err, res) => {
//             //console.log("this runs the login part");
//             res.body.should.have.property('id');
//             res.body.should.have.property('username');
//             res.body.should.have.property('email');
//             res.body.should.have.property('accessToken');
//           })
//       done();
//     });
//   });
// });

  
describe('/GET all reviews', () => {
  it("List of review page content", (done) => {
    request(`${server}/public/review`,
      (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
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