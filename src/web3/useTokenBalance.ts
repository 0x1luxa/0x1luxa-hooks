import { type Address, erc20Abi, zeroAddress } from 'viem'
import { useAccount, useBalance, useReadContract } from 'wagmi'

/**
 * @description Hook to get the balance of a token
 * @param tokenAddress - The address of the token (default: zeroAddress)
 * @returns The balance of the token (bigint)
 */
export const useTokenBalance = (tokenAddress = zeroAddress) => {
  const { address: accountAddress } = useAccount()
  const erc20TokenBalanceQuery = useReadContract({
    address: tokenAddress as Address,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: [accountAddress as Address],
    query: {
      enabled: tokenAddress !== zeroAddress
    }
  })
  const nativeBalanceQuery = useBalance({
    address: accountAddress,
    query: {
      enabled: tokenAddress === zeroAddress
    }
  })
  const result =
    tokenAddress === zeroAddress
      ? nativeBalanceQuery
      : erc20TokenBalanceQuery

  return result
}
