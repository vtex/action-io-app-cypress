import * as path from 'path'
import * as fs from 'fs/promises'

import * as core from '@actions/core'
import type { ExecOptions } from '@actions/exec'
import { exec } from '@actions/exec'

async function getToolbeltBin() {
  const toolbeltBasePath = path.dirname(require.resolve('vtex/package.json'))
  const { bin: toolbeltBin } = JSON.parse(
    (await fs.readFile(path.join(toolbeltBasePath, 'package.json'))).toString()
  )

  return path.join(toolbeltBasePath, toolbeltBin)
}

async function execToolbelt(args: string[], execOptions?: ExecOptions) {
  const bin = await getToolbeltBin()

  await exec(process.execPath, [bin, ...args], execOptions)
}

async function run() {
  const workspaceName = core.getInput('workspace', { required: true })

  await execToolbelt(['use', workspaceName], {
    input: Buffer.from('yes'),
  })

  core.saveState('createdWorkspace', workspaceName)
}

async function cleanup() {
  const createdWorkspace = core.getState('createdWorkspace')

  if (!createdWorkspace) {
    return
  }

  await execToolbelt(['workspace', 'delete', createdWorkspace], {
    input: Buffer.from('yes'),
  })
}

if (!core.getState('createdWorkspace')) {
  run()
} else {
  cleanup()
}
