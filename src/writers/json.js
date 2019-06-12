'use strict'

const { writeFile } = require('fs')
const { promisify } = require('util')

export const key = 'writer-json'

/**
 *
 * @param {Array} findings Data that should be written to disk
 * @param {Object} metadata Specific information needed by this writer
 * @param {String} metadata.file Which file to write to
 */
export const write = (findings = {}, metadata) => promisify(writeFile)(metadata.file, JSON.stringify({ findings }))
