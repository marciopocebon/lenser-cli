/* eslint-disable no-unused-expressions */

import Rc from '../rc'

describe('RC', () => {
  let rc
  beforeEach(() => {
    rc = new Rc()
  })

  describe('withFailOn', () => {
    it('should default failOn to low', () => {
      expect(rc.failOn).to.equal('low')
    })
    it('should let me set the failOn level', () => {
      rc.withFailOn('high')
      expect(rc.failOn).to.equal('high')
    })
    it('should reject bad failon levels', () => {
      expect(() => {
        rc.withFailOn('bad-value')
      }).to.throw()
    })
  })

  describe('withImage', () => {
    it('should add image', () => {
      const image = 'foo:bar'
      rc.withImage(image)
      expect(rc.images).to.include(image)
    })
  })

  describe('withSumo', () => {
    it('should add writer ', () => {
      rc.withSumo('http://url.com')
      const [writer] = rc.writers.filter(w => w.key === 'writer-sumo')
      expect(writer.key).to.equal('writer-sumo')
      expect(writer.opts).to.deep.equal({ url: 'http://url.com' })
    })
    it('should not allow invalid urls', () => {
      expect(() => { rc.withSumo('bad-url') }).to.throw()
    })
  })

  describe('withJson', () => {
    it('should add writer ', () => {
      rc.withJson('path')
      const [writer] = rc.writers.filter(w => w.key === 'writer-json')
      expect(writer.key).to.equal('writer-json')
      expect(writer.opts).to.deep.equal({ file: 'path' })
    })
    it('should reject bad paths', () => {
      expect(() => { rc.withJson('*!&@*$^path') }).to.throw()
    })
  })

  describe('withHttp', () => {
    it('should add writer ', () => {
      rc.withHttp('http://url.com')
      const [writer] = rc.writers.filter(w => w.key === 'writer-http')
      expect(writer.key).to.equal('writer-http')
      expect(writer.opts).to.deep.equal({ url: 'http://url.com' })
    })
    it('should not allow invalid urls', () => {
      expect(() => { rc.withHttp('bad-url') }).to.throw()
    })
  })
})
