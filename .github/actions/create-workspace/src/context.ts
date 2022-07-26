import type { IOContext } from '@vtex/api'

export function createContext({
  account,
  workspace,
  authToken,
}: {
  account: string
  workspace: string
  authToken: string
}): Omit<IOContext, 'logger' | 'tracer'> {
  return {
    account,
    userAgent: 'GitHub Action',
    workspace,
    authToken,
    region: '',
    production: false,
    product: '',
    route: {
      id: '',
      type: 'public',
      params: {},
    },
    requestId: '',
    operationId: '',
    platform: '',
  }
}
