/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable import/order */
/* eslint-disable tailwindcss/classnames-order */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConnectButton as Connector } from '@rainbow-me/rainbowkit'
import { MetaMaskIcon } from '../../assets'
import { Image } from 'antd-mobile'
import { RightOutline } from 'antd-mobile-icons'

const ConnectButton = () => {
  return (
    <>
      <p className="mb-4 text-3xl">Connect your wallet</p>
      <Connector.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading'
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated')

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      style={{
                        backgroundColor: 'rgba(229, 218, 235, 0.7)',
                      }}
                      className="background-color: rgb(226 232 240) h-19 w-80 rounded-lg p-2" // 这里定义了宽、高、背景色、文字颜色和圆角
                    >
                      <div className="flex space-x-8">
                        <Image src={MetaMaskIcon} className="h-11 w-48 ml-4" />
                        <RightOutline
                          className="text-2xl my-auto"
                          style={{ color: 'rgb(103 232 249)' }}
                        />
                      </div>
                    </button>
                  )
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      style={{
                        backgroundColor: 'rgba(229, 218, 235, 0.7)',
                      }}
                      className="background-color: rgb(226 232 240) h-19 w-80 rounded-lg p-2" // 这里定义了宽、高、背景色、文字颜色和圆角
                    >
                      <div className="flex space-x-8 text-2xl pl-12">
                        Unsupported Chain!
                      </div>
                    </button>
                  )
                }

                return (
                  <div style={{ display: 'flex', gap: 12 }}>
                    <button
                      onClick={openChainModal}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: 'rgba(229, 218, 235, 0.7)',
                      }}
                      className="h-[30px]  rounded-[20px] px-2"
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 18,
                            height: 18,
                            borderRadius: 9,
                            overflow: 'hidden',
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 18, height: 18 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>

                    <button
                      style={{
                        backgroundColor: 'rgba(229, 218, 235, 0.7)',
                        padding: '0 40px',
                        borderRadius: 10,
                      }}
                      onClick={openAccountModal}
                      type="button"
                    >
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </button>
                  </div>
                )
              })()}
            </div>
          )
        }}
      </Connector.Custom>
    </>
  )
}
export default ConnectButton
