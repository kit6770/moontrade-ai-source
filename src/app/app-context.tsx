/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { SWRConfig } from 'swr'

const storageLoad = (key: string) => {
  return localStorage.getItem(key)
}

const storageSave = (key: string, value: string) => {
  localStorage.setItem(key, value)
}

const storageRemove = (key: string) => {
  localStorage.removeItem(key)
}

const BASE_URL = 'https://luckycoin.im'

const storeMiddleware = next => (key: string, _nextFetcher: unknown, config: unknown) =>
  next(
    key,
    async (_key: string, payload: unknown) => {
      if (key === null || key === undefined) {
        return null
      }
      if (payload) {
        if (payload.arg === null || payload.arg === undefined) {
          await storageRemove(key)
        } else {
          await storageSave(key, payload.arg)
        }
      }
      return storageLoad(key)
    },
    config,
  )

// api
const apiMiddleware = next => (key: string, nextFetcher: unknown, config: unknown) => {
  if (typeof key === 'string' && key.startsWith('api:/')) {
    return next(
      key,
      async (_key: string, payload: unknown) => {
        const apiAccessToken = await storageLoad('apiAccessToken')
        const url = BASE_URL + '/dex-api/client/r0' + key.substring(4)
        const fetchConfig = {
          ...(payload?.arg ?? {}),
          headers: {
            'Content-Type': 'application/json',
            ...(payload?.arg?.headers ?? {}),
          },
        }
        if (apiAccessToken) {
          fetchConfig.headers.Authorization = `Bearer ${apiAccessToken}`
        }
        if (fetchConfig.body instanceof FormData) {
          delete fetchConfig.headers['Content-Type']
        }
        const res = await fetch(url, fetchConfig)
        return res.json()
      },
      config,
    )
  }
  return next(key, nextFetcher, config)
}

const httpMiddleware = next => (key: string, nextFetcher: unknown, config: unknown) => {
  if (
    typeof key === 'string' &&
    (key.toLowerCase().startsWith('http://') ||
      key.toLowerCase().startsWith('https://'))
  ) {
    return next(
      key,
      async (_key: string, payload: unknown) => {
        return fetch(key, {...(payload?.arg ?? {})})
      },
      config,
    )
  }
  return next(key, nextFetcher, config)
}

function AppContext({children}: {children: React.ReactNode}) {
  // 以后会在这里补全局状态还原之类的逻辑
  return children
}

async function globalFetcher(...a) {
  console.log('%cSWR FETCHER %o', 'font-size:64px;background:#fff;', a)
  return Promise.resolve()
}

export default function GlobalContextProvider({children}: {children: React.ReactNode}) {
  return (
    <SWRConfig value={{
      fetcher: globalFetcher,
      use: [storeMiddleware, httpMiddleware, apiMiddleware],
      provider: cache => {
        globalThis.$_$ = cache
        return cache
      },
    }}>
      <AppContext>{children}</AppContext>
    </SWRConfig>
  )
}
