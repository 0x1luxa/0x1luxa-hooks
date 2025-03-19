import { useEffect, useRef, useState } from 'react'

/**
 * A hook that toggles a boolean state every 1.5 seconds when data is available
 * @param data The data to check for existence
 * @returns A tuple containing the toggle state and a function to manually reset the toggle
 */
export const useToggleEvery1_5Sec = <T>(
  data: T | null | undefined
): [boolean, () => void] => {
  const [toggle, setToggle] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const resetToggle = () => {
    setToggle(false)

    // Clear existing interval if any
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    // Only start toggling if data exists
    if (data) {
      // Set up interval to toggle state every 1.5 seconds
      intervalRef.current = setInterval(() => {
        setToggle((prev) => !prev)
      }, 1500)
    } else {
      // Reset toggle when data is not available
      resetToggle()
    }

    // Clean up interval on unmount or when data changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [data])

  return [toggle, resetToggle]
}
