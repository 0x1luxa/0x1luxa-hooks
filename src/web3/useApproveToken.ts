import { type Address, erc20Abi, zeroAddress } from "viem"
import {
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
  UseWriteContractParameters,
} from "wagmi"

interface UseApproveTokenProperties {
  tokenAddress?: Address
  spenderAddress: Address
  amount: bigint
  mutationParameters?: UseWriteContractParameters
}

export const useApproveToken = (props: UseApproveTokenProperties) => {
  const { tokenAddress, spenderAddress, amount, mutationParameters } =
    props
  const { address } = useAccount()

  const {
    writeContract,
    data: hash,
    ...rest
  } = useWriteContract(mutationParameters)

  const receipt = useWaitForTransactionReceipt({
    hash,
  })

  const allowanceQuery = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "allowance",
    args: [address as Address, spenderAddress],
    query: {
      enabled: !!tokenAddress,
    },
  })

  const isApproved =
    tokenAddress === zeroAddress ||
    (!!allowanceQuery.data && allowanceQuery.data >= amount) ||
    amount === 0n

  const approveToken = async () => {
    if (!tokenAddress) {
      console.error("Token address is required")
      return
    }
    writeContract({
      abi: erc20Abi,
      address: tokenAddress,
      account: address as Address,
      functionName: "approve",
      args: [spenderAddress, amount],
    })
  }

  return {
    approveToken,
    isApproved,
    receipt,
    allowanceQuery,
    hash,
    ...rest,
  }
}
