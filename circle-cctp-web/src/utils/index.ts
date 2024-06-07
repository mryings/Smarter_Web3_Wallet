/* eslint-disable @typescript-eslint/no-unused-vars */

import { SUPPORTED_NETWORKS } from '../constants'

/**
 *
 * @param str string to truncate
 * @returns truncated string
 * @dev truncates string to 8 characters(using for address)
 */
function truncateString(str: `0x${string}` | undefined | string): string {
  if (!str) return ''
  if (str.length > 8) {
    return str.substring(0, 4) + '...' + str.substring(str.length - 4)
  }
  return str
}

function isSupportedNetwork(chainId?: number) {
  if (chainId === undefined) return false
  return SUPPORTED_NETWORKS.includes(chainId)
}

export { truncateString, isSupportedNetwork }
