import * as clair from '../clair'

describe('clair', () => {
  it('should be configured', () => {
    expect(clair.key).to.equal('clair')
  })
})
