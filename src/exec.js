'use strict'

import { spawn } from 'child_process'

export const run = (command, options = {}) => new Promise(function (resolve, reject) {
  const [root, ...args] = (command instanceof Array) ? command : command.split(' ')

  let stdout = ''
  let stderr = ''

  const proc = spawn(root, args, options)
  proc.stdout.on('data', data => { stdout += data.toString() })
  proc.stderr.on('data', data => { stderr += data.toString() })

  proc.on('error', err => {
    err.code = 255
    err.stdout = stdout.trim()
    err.stderr = stderr.trim()
    reject(err)
  })

  proc.on('exit', code => {
    resolve({
      code,
      stdout: stdout.trim(),
      stderr: stderr.trim()
    })
  })
})
