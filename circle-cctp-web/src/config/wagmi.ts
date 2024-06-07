/* eslint-disable sort-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { goerli, avalancheFuji } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

interface Env {
  REACT_APP_PROJECT_ID: string
  REACT_APP_ENABLE_LOCAL_NETWORK: boolean
  REACT_APP_ENABLE_TESTNETS: boolean
  REACT_APP_ALCHEMY_ID: string
  REACT_APP_APP_NAME: string
}

const env = process.env as unknown as Env

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    ...(env.REACT_APP_ENABLE_TESTNETS ? [avalancheFuji] : []),
    ...(env.REACT_APP_ENABLE_TESTNETS ? [goerli] : []),
  ],
  [alchemyProvider({ apiKey: env.REACT_APP_ALCHEMY_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: env.REACT_APP_APP_NAME,
  projectId: env.REACT_APP_PROJECT_ID,
  chains,
})

const wagmiConfig = createConfig({
  publicClient,
  webSocketPublicClient,
  connectors,
  autoConnect: true,
})

export { chains, wagmiConfig }
