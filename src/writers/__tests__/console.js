'use strict'

/* eslint-disable no-unused-expressions */

import { write } from '../console'

describe('Writer', () => {
  it('should write to console', async () => {
    sinon.stub(console, 'table')
    const payload = [{
      scanner: 'clair',
      image: 'foobar:latest',
      level: 'critical',
      cve: 'CVE-2019-12345678',
      description: 'foo bar'
    }, {
      scanner: 'aqua',
      image: 'foobar:latest',
      level: 'critical',
      cve: 'CVE-2019-23456789',
      description: 'foo bar'
    }]

    await write(payload)

    expect(console.table).to.have.been.calledOnce
    expect(console.table).to.have.been.calledWith(payload)
  })
})
