/* eslint-disable no-unused-expressions */

import { resolve } from 'path'
import { run } from '../exec'

describe('exec', () => {
  describe('command', () => {
    it('should execute commands', async () => {
      const { code, stdout, stderr } = await run('pwd')
      expect(code).to.equal(0)
      expect(stdout).to.equal(process.cwd())
      expect(stderr).to.be.empty
    })

    it('should execute commands on other directories', async () => {
      const cwd = resolve(process.cwd(), 'src')
      const { code, stdout, stderr } = await run('pwd', { cwd })
      expect(code).to.equal(0)
      expect(stdout).to.equal(cwd)
      expect(stderr).to.be.empty
    })

    it('should throw on error', async () => {
      let thrown = false
      try {
        await run('unknown-command')
      } catch (e) {
        thrown = true
        expect(e).to.be.instanceof(Error)
        expect(e.code).to.equal(255)
        expect(e.stdout).to.exist
        expect(e.stderr).to.exist
      }
      expect(thrown).to.be.true
    })
  })
})
