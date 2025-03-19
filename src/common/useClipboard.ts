import { useCallback, useState } from "react"

type CopiedValue = string | null

type CopyFunction = (text: string) => Promise<boolean>

type UseClipboardProps = {
  onSuccess?: () => void
  onError?: () => void
}

export const useClipboard = (props: UseClipboardProps) => {
  const { onSuccess, onError } = props
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFunction = useCallback(async (text) => {
    // Try to save to clipboard then save it in the state if worked
    try {
      if (!navigator?.clipboard) {
        throw new Error("Clipboard not supported")
      }
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      return true
    } catch (error) {
      console.warn("Copy failed", error)
      setCopiedText(null)
      return false
    }
  }, [])

  const handleCopy = (text: string) => {
    copy(text)
      .then(() => onSuccess?.())
      .catch(() => onError?.())
  }

  return { copiedText, copy, handleCopy }
}
