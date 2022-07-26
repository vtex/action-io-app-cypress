import * as core from '@actions/core'

import { createWorkspacesClient } from './workspacesClient'

async function run() {
  const account = core.getInput('account', { required: true })
  const workspaceName = core.getInput('workspace', { required: true })
  const authToken = core.getInput('token', { required: true })

  const workspacesClient = createWorkspacesClient({
    account,
    workspace: 'master',
    authToken,
  })

  await workspacesClient.create(account, workspaceName, false)

  core.info(`Successfully created workspace "${workspaceName}"`)

  core.saveState('createdWorkspace', workspaceName)
  core.saveState('account', account)
  core.saveState('token', authToken)
}

async function cleanup() {
  const createdWorkspace = core.getState('createdWorkspace')
  const account = core.getState('account')
  const authToken = core.getState('token')

  if (!createdWorkspace) {
    return
  }

  const workspacesClient = createWorkspacesClient({
    account,
    workspace: createdWorkspace,
    authToken,
  })

  await workspacesClient.delete(account, createdWorkspace)

  core.info(`Succesfully deleted workspace "${createdWorkspace}"`)
}

if (!core.getState('createdWorkspace')) {
  run()
} else {
  cleanup()
}
