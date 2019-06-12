'use strict'

require('console.table')

export const key = 'writer-console'

/**
 * @param {Array} results Data that should be written to the console
 * @returns {Promise} Resolves when everything was written
 */
export const write = async results => console.table(results)
