'use strict'

const nock = require('nock')
const { write } = require('../sumo')

const host = 'http://sumo.foobar'
const path = '/collector'
const opts = {
  url: host + path,
  host
}

describe('Writer', () => {
  it('should send to collector', async () => {
    const payload1 = {
      scanner: 'clair',
      image: 'foobar:latest',
      level: 'critical',
      cve: 'CVE-2019-12345678',
      description: 'foo bar'
    }
    const payload2 = {
      scanner: 'aqua',
      image: 'foobar:latest',
      level: 'critical',
      cve: 'CVE-2019-23456789',
      description: 'foo bar'
    }

    nock(host, {
      reqheaders: {
        'User-Agent': 'hawkeye-lenser',
        'X-Sumo-Category': /CVE-2019-/,
        'X-Sumo-Host': host
      }
    })
      .post(path, payload1)
      .reply(200)
      .post(path, payload2)
      .reply(200)

    await write([payload1, payload2], opts)
  })
})
