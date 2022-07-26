import * as core from '@actions/core'

import { createWorkspacesClient } from './workspacesClient'
import { updateToolbeltWorkspaceSession } from './session'

async function run() {
  const account = core.getInput('account', { required: true })
  const workspaceName = core.getInput('workspace', { required: true })
  const authToken = core.getInput('token', { required: true })
  const action = core.getInput('action', { required: true })

  const workspacesClient = createWorkspacesClient({
    account,
    workspace: 'master',
    authToken,
  })

  switch (action) {
    case 'create': {
      await workspacesClient.create(account, workspaceName, false)

      core.info(`Successfully created workspace "${workspaceName}"`)

      const updated = await updateToolbeltWorkspaceSession(workspaceName)

      if (updated) {
        core.info(
          `Updated toolbelt workspace session to use workspace "${workspaceName}"`
        )
      }

      break
    }

    case 'delete': {
      await workspacesClient.delete(account, workspaceName)

      core.info(`Succesfully deleted workspace "${workspaceName}"`)

      const updated = await updateToolbeltWorkspaceSession('-')

      if (updated) {
        core.info('Updated toolbelt workspace session to use last workspace')
      }

      break
    }

    default: {
      core.warning(`Unknown actino for workspace manager: "${action}"`)
    }
  }
}

run()
