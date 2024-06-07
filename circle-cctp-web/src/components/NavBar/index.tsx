/* eslint-disable tailwindcss/classnames-order */
import React from 'react'

import { Image } from 'antd-mobile'

import { BotIcon, BridgeIcon, IosAppsIcon, WalletIcon } from '../../assets'

const NavBar: React.FC<{}> = () => {
  return (
    <>
      <div className="mb-8 flex space-x-2">
        <Image src={WalletIcon} className="h-12 w-18" />
        <p className="pt-2 pl-3 text-4xl">Welcome!</p>
      </div>
      <p className="color: rgba(255,255,255,1) mb-8 flex space-x-2 text-3xl">
        Directly express what you want in crypto, and we can get and meet them
        for you
      </p>
      <div className="mb-8 flex justify-between">
        <div className="flex-1 flex flex-col items-center justify-center">
          <Image src={IosAppsIcon} className="mb-2" height={88} width={88} />
          <div className="text-xl text-center">Intent-centric</div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <Image src={BotIcon} className="mb-2" height={88} width={88} />
          <div className="text-xl text-center">Automated trading bot</div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <Image src={BridgeIcon} className="mb-2" height={88} width={88} />
          <div className="text-xl text-center">Seamless cross-chain</div>
        </div>
      </div>
    </>
  )
}

export default NavBar
