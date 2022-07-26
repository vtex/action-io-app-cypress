import type { IOContext } from '@vtex/api'
import { Logger } from '@vtex/api/lib/service/logger'

const noop = () => {}

export function createContext({
  account,
  workspace,
  authToken,
}: {
  account: string
  workspace: string
  authToken: string
}): IOContext {
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
    tracer: {
      fallbackSpanContext: () => ({} as any),
      inject: noop,
      isTraceSampled: false,
      startSpan: () => ({} as any),
      traceId: '',
    },
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
