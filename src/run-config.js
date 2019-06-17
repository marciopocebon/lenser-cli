import isValidPath from 'is-valid-path'

import * as consoleWriter from './writers/console.js'
import * as sumoWriter from './writers/sumo'
import * as jsonWriter from './writers/json'
import * as httpWriter from './writers/http'
import * as clair from './scanners/clair'

export default class RC {
  constructor () {
    this.scanners = [clair]
    this.images = []
    this.ip = 'localhost'
    this.failOn = 'low'
    this.writers = [consoleWriter]
  }

  withIp (ip) {
    if (!/^\d+.\d+.\d+.\d+$/.test(ip)) throw new Error('Invalid IPv4 address')

    this.ip = ip
    return this
  }

  withImage (image) {
    if (!image) throw new Error('Image name must not be empty')

    this.images.push(image)
    return this
  }

  withFailOn (level) {
    if (['low', 'medium', 'high', 'critical'].indexOf(level) === -1) {
      throw new Error(`${level} is not an valid fail level`)
    }
    this.failOn = level
    return this
  }

  withJson (file) {
    if (!isValidPath(file)) {
      throw new Error(file + ' is not a valid path')
    }
    this.writers.push({ ...jsonWriter, opts: { file } })
    return this
  }

  withSumo (url) {
    if (!/^(https?):\/\/.*$/.test(url)) {
      throw new Error('Invalid URL: ' + url)
    }
    this.writers.push({ ...sumoWriter, opts: { url } })
    return this
  }

  withHttp (url) {
    if (!/^(https?):\/\/.*$/.test(url)) {
      throw new Error('Invalid URL: ' + url)
    }
    this.writers.push({ ...httpWriter, opts: { url } })
    return this
  }
}
