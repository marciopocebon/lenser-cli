'use strict'

const colors = require('colors')

const notTest = process.env.NODE_ENV !== 'test'

export const log = (...args) => notTest && console.log('[info]', ...args)
export const warn = (...args) => notTest && console.log('[warn]', colors.yellow(...args))
export const error = (...args) => notTest && console.error('[error]', colors.red(...args))
