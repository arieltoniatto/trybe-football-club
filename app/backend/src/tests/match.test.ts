import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Match from '../database/models/MatchModel';

import { allMatches, inProgFalse, updateMatch } from './mocks/matchMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing endpoint Matches success', () => {
  let chaiHttpResponse: Response;

  afterEach(() => { sinon.restore() });
  it('get all matches', async () => {
    sinon
      .stub(Match, 'findAll')
      .resolves(allMatches as any[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')
      .send()

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(allMatches);
  })
  it('get all matches inProgress false', async () => {
    sinon
      .stub(Match, 'findAll')
      .resolves(inProgFalse as any[]);

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false')
      .send()

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(inProgFalse);
  })
  it('finish a match', async () => {
    sinon
      .stub(Match, 'update')
      .resolves();

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Finished' });
  })
  it('update a match', async () => {
    sinon
      .stub(Match, 'update')
      .resolves();

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/1')
      .send(updateMatch)

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Match updated' });
  })
})