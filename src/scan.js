import { flatMap, uniqBy } from 'lodash'
import * as logger from './logger'
import Results from './results'

export default async (rc = {}) => {
  // TODO: Scan multiple images
  const image = rc.images[0]

  logger.log('Scanners configured:', rc.scanners.map(s => s.scanner).join(', ').bold)
  logger.log('Images configured:', rc.images.join(', ').bold)

  let results = await rc.scanners
    .reduce((prom, { scanner, scan }) => prom.then(async accum => {
      logger.log('Scanning', image.bold, 'with', scanner.bold)
      try {
        const res = await scan({ image, ip: rc.ip })
        return accum.concat(res)
      } catch (e) {
        logger.error(scanner, 'returned an error!', e.message)
        return accum
      }
    }), Promise.resolve([]))

  results = flatMap(results, r => r.withSeverityAbove(rc.failOn))
  results = uniqBy(results, Results.CVE)

  logger.log(`Scan complete. ${results.length ? results.length : 'No'} vulnerabilities have been found.`.bold)

  for (const { key, write, opts } of rc.writers) {
    logger.log('Writing to', key.bold)
    await write(results, opts)
  }

  return results.length ? 1 : 0
}
