import React, { useRef, useState } from 'react'
import { Tabs, Swiper } from 'antd-mobile'
import { SwiperRef } from 'antd-mobile/es/components/swiper'
import BaseListItem from 'components/BaseListItem'
import { TransferIcon, UsdcIcon } from 'assets'
import { useUSDCBalance } from 'hooks/useUsdcBalance'
import { useNetwork } from 'wagmi'

type Props = {}

const tabItems = [
  { key: 'assets', title: 'Assets' },
  { key: 'transactions', title: 'Transactions' },
]

const DetailTab: React.FC<Props> = () => {
  const { goerliUSDC, avaxUSDC } = useUSDCBalance()
  const { chain } = useNetwork()
  const swiperRef = useRef<SwiperRef>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  return (
    <>
      <Tabs
        activeKey={tabItems[activeIndex].key}
        activeLineMode="full"
        onChange={(key) => {
          const index = tabItems.findIndex((item) => item.key === key)
          setActiveIndex(index)
          swiperRef.current?.swipeTo(index)
        }}
      >
        {tabItems.map((item) => (
          <Tabs.Tab title={item.title} key={item.key} />
        ))}
      </Tabs>
      <Swiper
        direction="horizontal"
        loop
        indicator={() => null}
        ref={swiperRef}
        defaultIndex={activeIndex}
        onIndexChange={(index) => {
          setActiveIndex(index)
        }}
      >
        <Swiper.Item>
          <BaseListItem
            iconSrc={UsdcIcon}
            iconSize={64}
            title="USDC"
            description="Stablecoin"
            extra={
              <>
                <p className="text-lg font-semibold text-circle-green">
                  ${chain?.id === 5 ? goerliUSDC : avaxUSDC}
                </p>
                <p className="text-sm  text-licorice-600">
                  {chain?.id === 5 ? goerliUSDC : avaxUSDC}
                </p>
              </>
            }
          />
        </Swiper.Item>
        <Swiper.Item>
          <BaseListItem
            iconSrc={TransferIcon}
            iconSize={64}
            title="USDC"
            description="Stablecoin"
          />
        </Swiper.Item>
      </Swiper>
    </>
  )
}

export default DetailTab
