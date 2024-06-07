/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mask, ProgressCircle } from 'antd-mobile'
import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import { useNetwork, useSwitchNetwork } from 'wagmi'

type Props = {
  visible: boolean
  setVisible: any
  status: {
    text: string
    percent: number
  }
  handleSuccess: () => void
}

const WaitingModal: React.FC<Props> = ({
  visible,
  status,
  handleSuccess,
  setVisible,
}) => {
  const { text, percent } = status
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const [isFetching, setIsFetching] = useState(false)

  useEffect(() => {
    if (chain?.id === 43113) {
      setIsFetching(true)
      handleSuccess()
      setIsFetching(false)
      setVisible(false)
    }
  }, [chain?.id, handleSuccess, setVisible])

  return (
    <>
      <Mask color="white" visible={visible}>
        <div className={styles.overlayContent}>
          {percent !== 99 && percent !== 100 && (
            <ProgressCircle
              percent={percent}
              style={{ '--size': '90px', '--track-width': '6px' }}
            >
              <div className={styles.mainText}>{text}</div>
            </ProgressCircle>
          )}
          {percent === 99 && (
            <div
              className="rounded-md bg-gumdrop-75 p-2 text-lg text-circle-green"
              onClick={() => {
                if (chain?.id === 43113) return
                switchNetwork?.(43113)
              }}
            >
              {isFetching ? 'Waiting' : 'Change to Avax'}
            </div>
          )}
        </div>
      </Mask>
    </>
  )
}

export default WaitingModal
