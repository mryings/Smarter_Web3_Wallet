import React from 'react'
import { AvatarInfo, DetailTab } from '../../../components'
import { useUSDCBalance } from 'hooks/useUsdcBalance'
import { useNetwork } from 'wagmi'

type Props = {}

const TransactionDetail: React.FC<{}> = (props: Props) => {
  const { goerliUSDC, avaxUSDC } = useUSDCBalance()
  const { chain } = useNetwork()
  const renderOverview = () => {
    return (
      <>
        <div className="mt-8 text-center text-5xl font-semibold text-circle-green">
          {chain?.id === 5 ? goerliUSDC : avaxUSDC}
        </div>
        <div className="mt-1 text-center text-xl font-semibold text-circle-green">
          $USDC
        </div>
        <div className="mt-8 flex justify-between">
          <div className=" flex-1 text-center">
            <div className="text-base text-redhot-400">0</div>
            <div className="text-lg text-circle-green">Past Day</div>
          </div>
          <div className=" flex-1 text-center">
            <div className="text-base text-apple-400">0</div>
            <div className="text-lg text-circle-green">In Total</div>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <AvatarInfo />
      {renderOverview()}
      <DetailTab />
    </>
  )
}

export default TransactionDetail
