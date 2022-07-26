import { Workspaces } from '@vtex/api'

import { createContext } from './context'

export function createWorkspacesClient({ account, workspace, authToken }: { account: string; workspace: string; authToken: string }) {
  const context = createContext({ account, workspace, authToken })

  return new Workspaces(context)
}
