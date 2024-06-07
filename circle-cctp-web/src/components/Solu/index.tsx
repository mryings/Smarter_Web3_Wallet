import Result from 'components/Result'
import React from 'react'
import { truncateString } from 'utils'
import { Image } from 'antd-mobile'
import { CircleIcon, TransferIcon } from 'assets'
import { DownOutline } from 'antd-mobile-icons'

type Props = {
  transactionDetail: {
    receiver: string
    amount: number | string
    token?: string
  }
}

const Solution: React.FC<Props> = ({ transactionDetail }) => {
  const { receiver, amount, token = 'USDC' } = transactionDetail
  const renderExtra = () => {
    return (
      <>
        <div className="mb-2 text-lg font-semibold text-circle-green">
          Sequence of operations:
        </div>
        <div className="flex justify-between">
          <div className="text-center text-circle-green">
            <span className="font-semibold">Cross chain</span> {amount} ${token}{' '}
            in Goerli to Avax
          </div>
          <div className="flex w-12 flex-col items-center px-12">
            <Image src={CircleIcon} width={24} height={24} />
            <div className="mt-1 text-circle-green">CCTP</div>
          </div>
        </div>
        <DownOutline className="mx-auto my-4 text-xl text-circle-green" />
        <div className="flex justify-between">
          <div className="text-center text-circle-green">
            <span className="font-semibold">Send</span> {amount} ${token} to{' '}
            {truncateString(receiver || '0x00')}
          </div>
          <div className="flex w-12 flex-col items-center px-12">
            <Image src={TransferIcon} width={24} height={24} />
            <div className="mt-1 text-circle-green">Transfer</div>
          </div>
        </div>
      </>
    )
  }
  return (
    <div>
      <Result
        title="Estimated Results:"
        needFooter
        extra={renderExtra()}
        transactionDetail={transactionDetail}
      />
    </div>
  )
}

export default Solution
