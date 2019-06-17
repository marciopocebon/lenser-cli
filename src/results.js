import { pick } from 'lodash'

/**
 * Captures the results from the different modules in a standardized form
 */
export default class Results {
  static get CVE () { return 'cve' }
  static get DESCRIPTION () { return 'description' }
  static get OFFENDER () { return 'offender' }
  static get SEVERITY () { return 'severity' }
  static get SEVERITY_LOW () { return 'low' }
  static get SEVERITY_MEDIUM () { return 'medium' }
  static get SEVERITY_HIGH () { return 'high' }
  static get SEVERITY_CRITICAL () { return 'critical' }

  constructor () {
    this._critical = []
    this._high = []
    this._medium = []
    this._low = []
  }

  withSeverityAbove (score) {
    const threshold = { low: 1, medium: 2, high: 4, critical: 8 }
    let res = []
    if (threshold[score] <= threshold[Results.SEVERITY_CRITICAL]) res = res.concat(this.critical)
    if (threshold[score] <= threshold[Results.SEVERITY_HIGH]) res = res.concat(this.high)
    if (threshold[score] <= threshold[Results.SEVERITY_MEDIUM]) res = res.concat(this.medium)
    if (threshold[score] <= threshold[Results.SEVERITY_LOW]) res = res.concat(this.low)
    return res
  }

  set critical (r) {
    this._critical.push(pick(r, [Results.CVE, Results.DESCRIPTION, Results.OFFENDER, Results.SEVERITY]))
  }

  get critical () {
    return this._critical
  }

  set high (r) {
    this._high.push(pick(r, [Results.CVE, Results.DESCRIPTION, Results.OFFENDER, Results.SEVERITY]))
  }

  get high () {
    return this._high
  }

  set medium (r) {
    this._medium.push(pick(r, [Results.CVE, Results.DESCRIPTION, Results.OFFENDER, Results.SEVERITY]))
  }

  get medium () {
    return this._medium
  }

  set low (r) {
    this._low.push(pick(r, [Results.CVE, Results.DESCRIPTION, Results.OFFENDER, Results.SEVERITY]))
  }
  get low () {
    return this._low
  }
}
