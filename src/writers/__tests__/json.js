'use strict'

import { write } from '../json'
import path from 'path'
import { readFileSync, unlinkSync } from 'fs'

const metadata = {
  file: path.join(__dirname, 'testfile.json')
}

describe('JSON Writer', () => {
  it('should write JSON to a file', async () => {
    const findings = [{ 'key': 'value' }]
    const expected = JSON.stringify({ findings })

    await write(findings, metadata)

    expect(readFileSync(metadata.file).toString()).to.equal(expected)
    unlinkSync(metadata.file)
  })
})
