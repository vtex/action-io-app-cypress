import { homedir } from 'os'
import * as path from 'path'
import * as fs from 'fs/promises'
import { existsSync } from 'fs'

export async function updateToolbeltWorkspaceSession(workspaceName: string): Promise<boolean> {
  const sessionDirectory = path.join(homedir(), '.vtex', 'session')
  const workspaceFile = path.join(sessionDirectory, 'workspace.json')

  if (!existsSync(workspaceFile)) {
    return false
  }

  const workspace = JSON.parse((await fs.readFile(workspaceFile)).toString())

  if (workspaceName === '-') {
    workspace.currentWorkspace = workspace.lastWorkspace
    workspace.lastWorkspace = null
  } else {
    workspace.lastWorkspace = workspace.currentWorkspace
    workspace.currentWorkspace = workspaceName
  }

  await fs.writeFile(workspaceFile, JSON.stringify(workspace))

  return true
}
