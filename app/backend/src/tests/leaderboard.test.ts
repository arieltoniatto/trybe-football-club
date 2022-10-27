import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Match from '../database/models/MatchModel';

import { generalLeaderboard } from './mocks/leaderboardMocks';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing endpoint Leaderboard success', () => {
  let chaiHttpResponse: Response;

  afterEach(() => { sinon.restore() });
  it('get general leaderboard', async () => {
    sinon
      .stub(Match, 'findAll')
      .resolves(generalLeaderboard as any[])

      chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard')
      .send()

      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.deep.equal(generalLeaderboard);
  })
})