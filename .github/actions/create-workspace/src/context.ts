import type { IOContext } from '@vtex/api'
import { createTracingContextFromCarrier } from '@vtex/api'
import { Logger } from '@vtex/api/lib/service/logger'

export function createContext({
  account,
  workspace,
  authToken,
}: {
  account: string
  workspace: string
  authToken: string
}): IOContext {
  const { tracer } = createTracingContextFromCarrier('', {})

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
    tracer,
    requestId: '',
    operationId: '',
    platform: '',
    logger: new Logger({
      production: false,
      account,
      workspace,
      operationId: '',
      requestId: '',
    }),
  }
}
