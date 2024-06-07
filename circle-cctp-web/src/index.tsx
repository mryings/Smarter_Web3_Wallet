/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
import React from 'react'
import 'polyfills'

import { createRoot } from 'react-dom/client'

import App from 'App'
import reportWebVitals from 'reportWebVitals'
import 'styles/tailwind.css'
import '@rainbow-me/rainbowkit/styles.css'

import { WagmiConfig } from 'wagmi'

import { chains, wagmiConfig } from 'config/wagmi'

import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

const element = document.getElementById('root')
if (element === null) throw new Error('Root container missing in index.html')

const root = createRoot(element)
root.render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} coolMode modalSize="compact">
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
void reportWebVitals()
