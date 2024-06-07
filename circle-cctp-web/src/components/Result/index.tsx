/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable promise/param-names */
/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  GOERLI_USDC_ADDR,
  GOERLI_TOKEN_MESSENGER_CONTRACT_ADDRESS,
  AVAX_DESTINATION_DOMAIN,
  GOERLI_MESSAGE_CONTRACT_ADDRESS,
  GOERLI_MESSAGE_TRANSMITTER_CONTRACT_ADDRESS,
  AVAX_MESSAGE_TRANSMITTER_CONTRACT_ADDRESS,
} from '../../constants'
import React, { useEffect, useState } from 'react'
import { truncateString } from 'utils'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useContractEvent,
  useSwitchNetwork,
  useNetwork,
} from 'wagmi'
import USDC_ABI from '../../abis/Usdc.json'
import TOKEN_MESSENGER_ABI from '../../abis/TokenMessenger.json'
import MESSAGE_ABI from '../../abis/Message.json'
import MESSAGE_TRANSMITTER_ABI from '../../abis/MessageTransmitter.json'
import { keccak256, parseUnits } from 'viem'
import { Result as Res, Toast } from 'antd-mobile'
import { Link } from 'react-router-dom'

type Props = {
  needFooter?: boolean
  title: string
  transactionDetail: {
    receiver: string
    amount: number | string
    token?: string
  }
  extra?: React.ReactNode
}

const Result: React.FC<Props> = ({
  title,
  transactionDetail,
  extra,
  needFooter = false,
}) => {
  const { amount, receiver, token = 'USDC' } = transactionDetail
  const { address } = useAccount()
  const [signInfo, setSignInfo] = useState<{
    messageBytes: string
    attestationSignature: string
  }>()
  const [isFetching, setIsFetching] = useState(false)
  const [step, setStep] = useState(0)
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const { data: bytesTransformResult } = useContractRead({
    address: GOERLI_MESSAGE_CONTRACT_ADDRESS,
    abi: MESSAGE_ABI,
    functionName: 'addressToBytes32',
    args: [receiver],
  })
  const { config: approveConfig } = usePrepareContractWrite({
    address: GOERLI_USDC_ADDR,
    abi: USDC_ABI,
    functionName: 'approve',
    args: [GOERLI_TOKEN_MESSENGER_CONTRACT_ADDRESS, parseUnits(`${amount}`, 6)],
  })

  const { write: approve, isLoading: isApproveLoading } =
    useContractWrite(approveConfig)

  const { config: burnConfig } = usePrepareContractWrite({
    address: GOERLI_TOKEN_MESSENGER_CONTRACT_ADDRESS,
    abi: TOKEN_MESSENGER_ABI,
    functionName: 'depositForBurn',
    args: [
      parseUnits(`${amount}`, 6),
      AVAX_DESTINATION_DOMAIN,
      bytesTransformResult,
      GOERLI_USDC_ADDR,
    ],
  })

  const { write: transmitter, isLoading: isTransmitterLoading } =
    useContractWrite({
      address: AVAX_MESSAGE_TRANSMITTER_CONTRACT_ADDRESS,
      abi: MESSAGE_TRANSMITTER_ABI,
      functionName: 'receiveMessage',
      chainId: 43113,
      onSuccess() {
        setStep(1)
      },
    })

  useEffect(() => {
    if (
      chain?.id !== 43113 &&
      signInfo?.attestationSignature &&
      signInfo.attestationSignature !== ''
    ) {
      switchNetwork?.(43113)
    }
  }, [chain, signInfo?.attestationSignature, switchNetwork])

  useEffect(() => {
    if (
      chain?.id === 43113 &&
      signInfo?.attestationSignature &&
      signInfo.attestationSignature !== ''
    ) {
      transmitter({
        args: [signInfo?.messageBytes, signInfo?.attestationSignature],
      })
    }
  }, [
    chain?.id,
    signInfo?.attestationSignature,
    signInfo?.messageBytes,
    transmitter,
  ])

  const { write: burn, isLoading: isBurnLoading } = useContractWrite(burnConfig)

  useContractEvent({
    address: GOERLI_MESSAGE_TRANSMITTER_CONTRACT_ADDRESS,
    abi: MESSAGE_TRANSMITTER_ABI,
    chainId: 5,
    eventName: 'MessageSent',
    async listener(log: any[]) {
      const _messageBytes = log[log.length - 1].args.message
      const _messageHash = keccak256(_messageBytes)
      // STEP 4: Fetch attestation signature
      let attestationResponse: { status: string; attestation: string } = {
        status: 'pending',
        attestation: '',
      }
      while (attestationResponse.status !== 'complete') {
        const response = await fetch(
          `https://iris-api-sandbox.circle.com/v1/attestations/${_messageHash}`
        )
        attestationResponse = await response.json()
        await new Promise((r) => setTimeout(r, 2000))
      }
      const _attestationSignature = attestationResponse.attestation
      setSignInfo({
        messageBytes: _messageBytes,
        attestationSignature: _attestationSignature,
      })
      transmitter({
        args: [_messageBytes, _attestationSignature],
      })
      setIsFetching(false)
    },
  })

  const handleChange = () => {
    history.back()
  }

  /**
   * @dev
   * STEP 1: Approve messenger contract to withdraw from our active eth address
   */
  const handleApprove = () => {
    setIsFetching(true)
    approve?.()
  }

  const handleBurn = () => {
    burn?.()
  }

  const handleConfirm = () => {
    if (chain?.id !== 5)
      return Toast.show({ content: 'please switch to goerli network' })
    handleApprove()
    handleBurn()
  }
  return (
    <>
      {step === 0 && (
        <p className=" mx-auto my-4 w-11/12 text-xl font-semibold text-circle-green">
          Send ${token} to {truncateString(receiver || '0x00')}
        </p>
      )}
      {step === 0 && (
        <div
          style={{
            boxShadow:
              '9.057971000671387px 9.057971000671387px 36.23188400268555px 0px rgba(0, 0, 0, 0.25)',
          }}
          className=" mx-auto w-11/12 rounded-lg"
        >
          <div
            className="rounded-t-lg p-4"
            style={{ backgroundColor: '#e7ece6' }}
          >
            {extra}
            <div className="text-lg font-semibold text-circle-green">
              {title}
            </div>
            <div className="flex py-2">
              <div className="flex flex-1 items-center justify-center text-circle-green">
                <p>You</p>
              </div>
              <div className="flex flex-1 items-center justify-center text-lg font-medium text-redhot-500">
                <p>- {amount}</p>
              </div>
              <div className="flex flex-1 items-center justify-center text-circle-green">
                <p>${token}</p>
              </div>
            </div>
            <div className="flex py-2">
              <div className="flex flex-1 items-center justify-center text-circle-green">
                <p>Receipt</p>
              </div>
              <div className="flex flex-1 items-center justify-center text-lg font-medium text-apple-400">
                <p>+ {amount}</p>
              </div>
              <div className="flex flex-1 items-center justify-center text-circle-green">
                <p>${token}</p>
              </div>
            </div>
            <div>
              <span className="font-medium text-circle-green">Receipt</span>
              <span className=" ml-6 text-circle-green">
                {truncateString(receiver)}
              </span>
            </div>
            <div>
              <span className="font-medium text-circle-green">Address</span>
              <span className=" ml-6 text-circle-green">
                {truncateString(address)}
              </span>
            </div>
            <div className="flex justify-between">
              <div>
                <div>
                  <span className="font-medium text-circle-green">
                    Transaction fees
                  </span>
                  <span className=" ml-6 text-circle-green">
                    {/* {transactionFees} */}0
                  </span>
                </div>
              </div>
              <div>
                <span className="font-semibold text-circle-green text-redhot-frosting-primary">
                  No.1
                </span>
              </div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>
                <div>
                  <span className="font-medium text-circle-green">
                    Processing time
                  </span>
                  <span className=" ml-6 text-circle-green">
                    {/* {processingTime} */}
                    2~5s
                  </span>
                </div>
              </div>
              <div>
                <span className="font-semibold text-circle-green text-redhot-frosting-primary">
                  No.1
                </span>
              </div>
            </div>
          </div>
          {needFooter && (
            <div
              style={{
                backgroundColor: '#fafbfa',
              }}
              className="flex h-12  w-full items-center rounded-b-lg text-center text-lg font-semibold text-circle-green"
            >
              <div
                style={{ borderRight: '1px solid rgba(168, 165, 169, 0.5)' }}
                className="flex-1 py-2"
                onClick={() => {
                  if (
                    isApproveLoading ||
                    isBurnLoading ||
                    isTransmitterLoading ||
                    isFetching
                  )
                    return
                  handleChange()
                }}
              >
                {isApproveLoading ||
                isBurnLoading ||
                isTransmitterLoading ||
                isFetching
                  ? 'Loading...'
                  : 'Change'}
              </div>
              <div
                className="flex-1"
                onClick={() => {
                  if (
                    isApproveLoading ||
                    isBurnLoading ||
                    isTransmitterLoading ||
                    isFetching
                  )
                    return
                  handleConfirm()
                }}
              >
                {isApproveLoading ||
                isBurnLoading ||
                isTransmitterLoading ||
                isFetching
                  ? 'Loading...'
                  : 'Confirm'}
              </div>
            </div>
          )}
        </div>
      )}
      {step === 1 && (
        <>
          <Res
            style={{
              backgroundColor: 'transparent',
            }}
            status="success"
            title={
              <div className="text-2xl text-circle-green">
                Send successfully!
              </div>
            }
            description={
              <>
                <div
                  style={{
                    boxShadow:
                      '9.057971000671387px 9.057971000671387px 36.23188400268555px 0px rgba(0, 0, 0, 0.25)',
                  }}
                  className=" mx-auto w-11/12 rounded-lg"
                >
                  <div
                    className="rounded-t-lg p-4"
                    style={{ backgroundColor: '#e7ece6' }}
                  >
                    <div className="text-lg font-semibold text-circle-green">
                      Transfer Results
                    </div>
                    <div className="flex py-2">
                      <div className="flex flex-1 items-center justify-center text-circle-green">
                        <p>You</p>
                      </div>
                      <div className="flex flex-1 items-center justify-center text-lg font-medium text-redhot-500">
                        <p>- {amount}</p>
                      </div>
                      <div className="flex flex-1 items-center justify-center text-circle-green">
                        <p>${token}</p>
                      </div>
                    </div>
                    <div className="flex py-2">
                      <div className="flex flex-1 items-center justify-center text-circle-green">
                        <p>Receipt</p>
                      </div>
                      <div className="flex flex-1 items-center justify-center text-lg font-medium text-apple-400">
                        <p>+ {amount}</p>
                      </div>
                      <div className="flex flex-1 items-center justify-center text-circle-green">
                        <p>${token}</p>
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-circle-green">
                        Receipt
                      </span>
                      <span className=" ml-6 text-circle-green">
                        {truncateString(receiver)}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium text-circle-green">
                        Address
                      </span>
                      <span className=" ml-6 text-circle-green">
                        {truncateString(address)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <div>
                          <span className="font-medium text-circle-green">
                            Transaction fees
                          </span>
                          <span className=" ml-6 text-circle-green">
                            {/* {transactionFees} */} unknown
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold text-circle-green text-redhot-frosting-primary">
                          No.1
                        </span>
                      </div>
                    </div>
                    <div className="mb-2 flex justify-between">
                      <div>
                        <div>
                          <span className="font-medium text-circle-green">
                            Processing time
                          </span>
                          <span className=" ml-6 text-circle-green">
                            {/* {processingTime} */}
                            2~5s
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="font-semibold text-circle-green text-redhot-frosting-primary">
                          No.1
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          />
          <Link to="/">
            <div className=" mx-auto my-0 h-12 w-64 rounded-lg bg-gumdrop-50 pt-3 text-center text-lg text-circle-green">
              Done
            </div>
          </Link>
        </>
      )}
    </>
  )
}

export default Result
