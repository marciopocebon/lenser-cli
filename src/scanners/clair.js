import { promises as fs, existsSync as exists } from 'fs'
import { resolve } from 'path'
import { run } from '../exec'
import Results from '../results'
import * as logger from '../logger'
import * as tmp from 'tmp'

export const scanner = 'clair'

export async function scan ({ image, ip = 'localhost' }, report) {
  report = report || resolve(tmp.dirSync().name, 'report-clair.json')
  const { code, stderr } = await run(`clair-scanner --ip ${ip} --report ${report} ${image}`)

  if (code !== 0 && !exists(report)) {
    logger.error(stderr)
    throw new Error('Clair scanning failed!')
  }

  let vulnerabilities = JSON.parse(await fs.readFile(report)).vulnerabilities
    .map(v => ({
      severity: v.severity.toLowerCase(),
      cve: v.vulnerability,
      description: v.link,
      offender: v.featurename
    }))

  const results = new Results()
  vulnerabilities.forEach(v => { results[v.severity] = v })
  return results
}
