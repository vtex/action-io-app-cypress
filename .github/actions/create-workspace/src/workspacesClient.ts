import type { IOContext } from '@vtex/api'
import * as http from '@actions/http-client'

import { createContext } from './context'

const BASE_URL = 'https://platform.io.vtex.com'

class Workspaces {
  private client: http.HttpClient

  constructor(private context: Omit<IOContext, 'logger' | 'tracer'>) {
    this.client = new http.HttpClient(
      'github-action/create-workspace',
      undefined,
      {
        headers: {
          Authorization: `Bearer ${context.authToken}`,
        },
        maxRetries: 3,
      }
    )
  }

  public async create(account: string, workspace: string, production: boolean) {
    await this.client.postJson(`${BASE_URL}/${account}`, {
      name: workspace,
      production,
    })
  }

  public async delete(account: string, workspace: string) {
    await this.client.del(`${BASE_URL}/${account}/${workspace}`)
  }
}

export function createWorkspacesClient({
  account,
  workspace,
  authToken,
}: {
  account: string
  workspace: string
  authToken: string
}) {
  const context = createContext({ account, workspace, authToken })

  return new Workspaces(context)
}
