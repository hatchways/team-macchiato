const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

chai.should();
chai.use(chaiHttp);

describe("/POST ping", () => {
  it("it should return 400", done => {
    chai
      .request(app)
      .post(`/ping/`)
      .send({ teamName: "Shums" })
      .end((err, res) => {
        console.log(res.body)
        console.log(res.status)
        res.should.have.status(200);
        res.body.should.have
          .property("response")
          .eql("Shums is part of the team!");
        done();
      });
  });
});
