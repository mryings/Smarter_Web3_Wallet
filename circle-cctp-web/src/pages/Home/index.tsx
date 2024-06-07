import React from 'react'

import { ConnectButton, NavBar } from '../../components'
import { useAccount, useNetwork } from 'wagmi'
import TransactionDetail from './components/TransactionDetail'
import { isSupportedNetwork } from 'utils'

// type Props = {}

const Home: React.FC<{}> = () => {
  const { isConnected } = useAccount()
  const { chain } = useNetwork()
  if (isConnected && isSupportedNetwork(chain?.id)) return <TransactionDetail />
  return (
    <>
      <NavBar />
      <ConnectButton />
    </>
  )
}

export default Home
