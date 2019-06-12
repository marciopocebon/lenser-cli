'use strict'

import nock from 'nock'
import { write } from '../http'

const host = 'http://host.foobar'
const path = '/collector'
const opts = { url: host + path }

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

    nock(host, { reqheaders: { 'User-Agent': 'hawkeye-lenser' } })
      .post(path, payload1)
      .reply(200)
      .post(path, payload2)
      .reply(200)

    await write([payload1, payload2], opts)
  })
})
