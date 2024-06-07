import React from 'react'
import { DefaultAvatar } from '../../assets'
import { Avatar, Space } from 'antd-mobile'
import { useAccount, useBalance } from 'wagmi'
import { truncateString } from '../../utils'
// import { useUSDCBalance } from 'hooks/useUsdcBalance'

type Props = {}

const AvatarInfo: React.FC<Props> = () => {
  const { address, isDisconnected } = useAccount()
  // const { chain, chains } = useNetwork()
  // const { data: usdcBalance } = useUSDCBalance(chain?.name)
  // console.log(usdcBalance)

  const { data } = useBalance({ address })

  return (
    <>
      <Space block direction="vertical">
        <div className="flex items-center">
          <Avatar src={DefaultAvatar} className="h-18 w-18 rounded-full" />
          <div className="ml-4">
            <p className="text-lg font-semibold text-circle-green">User</p>
            <p className="text-sm  text-licorice-600">
              {isDisconnected
                ? 'No Address'
                : `${truncateString(address)} (${
                    data?.formatted.slice(0, 5) ?? '0'
                  } ${data?.symbol ?? 'ETH'})`}
            </p>
          </div>
        </div>
      </Space>
    </>
  )
}

export default AvatarInfo
