import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { Response } from 'superagent';
import User from '../database/models/UserModel';

import { findOne, loginBody, invalidEmail } from './mocks/loginMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Login endpoint success', () => {

  let chaiHttpResponse: Response;
  let token: string;
  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(findOne as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Request OK', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(loginBody)

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.have.property('token')
  });
});

describe('Testing Login endpoint errors', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(null);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Error if email is invalid', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(invalidEmail)

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password')
  })
})

describe('Testing login/validade endpoint success', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(findOne as User);
  });

  afterEach(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('Request OK', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', 'eyJhbGciOiJIUzI1NiJ9.YWRtaW5AYWRtaW4uY29t.s1U6I8B6x_9eLeJyb9PdjTz1JbNXo57xor-T1493RW0')

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.equal('admin')
  })
})