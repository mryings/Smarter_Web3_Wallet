/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unneeded-ternary */
import { useAccount, useContractRead } from 'wagmi'
import { EUsdcAddress } from '../types'
import { erc20ABI } from '@wagmi/core'
import { formatUnits } from 'viem'

/**
 * @dev
 * example usage:
 * const { goerliUSDC, avaxUSDC } = useUSDCBalance()
 * const { chain } = useNetwork()
 * const balance = chain?.id === 5 ? goerliUSDC : avaxUSDC
 *
 * @returns {goerliUSDC: string; avaxUSDC: string}
 */
export function useUSDCBalance(): { goerliUSDC: string; avaxUSDC: string } {
  const { address, isConnecting } = useAccount()
  if (isConnecting) return { goerliUSDC: 'Loading...', avaxUSDC: 'Loading...' }
  if (!address) return { goerliUSDC: '0', avaxUSDC: '0' }

  const { data: goerliUSDC } = useContractRead({
    address: EUsdcAddress.Goerli,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address],
  })
  const { data: avaxUSDC } = useContractRead({
    address: EUsdcAddress['Avalanche-fuji'],
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address],
  })

  return {
    goerliUSDC: formatUnits(goerliUSDC || BigInt(0), 6),
    avaxUSDC: formatUnits(avaxUSDC || BigInt(0), 6),
  }
}
