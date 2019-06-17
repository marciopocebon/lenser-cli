/* eslint-disable no-unused-expressions */

import { resolve } from 'path'
import * as clair from '../clair'
import * as exec from '../../exec'

const image = 'testimage'
const ip = '1.2.3.4'

describe('clair', () => {
  beforeEach(() => {
    sinon.stub(exec, 'run')
  })

  it('should scan an image', async () => {
    const report = resolve(__dirname, 'fixtures', 'report-clair.json')
    exec.run.resolves({ code: 0 })
    const results = await clair.scan({ image, ip }, report)

    expect(results.low.length).to.equal(1)
    expect(results.medium.length).to.equal(17)
    expect(results.high.length).to.equal(10)
    expect(results.critical.length).to.equal(0)
  })

  it('should error when scanning failed', async () => {
    const report = resolve(__dirname, 'fixtures', 'nonexistent.json')
    exec.run.resolves({ code: 1, stderr: 'error' })
    let hasErrored = false
    try {
      await clair.scan({ image: 'errorimage', ip: '1.2.3.4' }, report)
    } catch (e) {
      hasErrored = true
    }

    expect(hasErrored).to.be.true
  })
})
