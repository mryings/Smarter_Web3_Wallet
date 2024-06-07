import request, { AxiosResponse } from 'axios'
interface Ops {
  type: string
  source_chain: string
  token: string
  amount: string
  receiver: string
  target_chain: string
}
interface Result {
  category: string
  detail: {
    reply: string
    ops: Ops[]
  }
}
export interface AxiosResult extends AxiosResponse {
  data: Result
}

export const circleAttestations = async (messageHash: string) => {
  return await request.get(
    `https://iris-api-sandbox.circle.com/v1/attestations/${messageHash}`
  )
}

export const crossChainAbstraction = async (
  demand: string
): Promise<AxiosResult> => {
  const data = { category: 'crossChainAbstraction', demand }

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://smarter-api-da.web3idea.xyz/v1/demand',
    headers: {},
    data,
  }
  const result: AxiosResult = await request(config)
  return result
}

export const demandTransfer = async (demand: string) => {
  const data = { category: 'chainAbstraction-transfer', demand }

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://smarter-api-da.web3idea.xyz/v1/demand',
    headers: {},
    data,
  }

  return await request(config)
}
