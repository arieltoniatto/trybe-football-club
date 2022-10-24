import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/TeamModel';

import { resultM, resultOne } from './mocks/teamMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing Teams endpoint success', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(resultM as Team[]);
  });

  afterEach(() => {
    (Team.findAll as sinon.SinonStub).restore();
  });
  it('Request OK', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams')
      .send()

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(resultM);
  });
});
describe('Testing /teams/:id endpoint success', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Team, "findOne")
      .resolves(resultOne as Team);
  });

  afterEach(() => {
    (Team.findOne as sinon.SinonStub).restore();
  });
  it('Request OK', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/12')
      .send()

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(resultOne);
  });
});
describe('Testing wrong id request on /teams/:id', () => {
  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(Team, "findOne")
      .resolves(null);
  });

  afterEach(() => {
    (Team.findOne as sinon.SinonStub).restore();
  });
  it('Error if id is not found', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/12')
      .send()

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body.message).to.be.deep.equal('Team not found');
  })
})
