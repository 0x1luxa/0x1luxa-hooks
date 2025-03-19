import { useMemo } from "react"

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, index) => index + start)
}

interface IUsePaginationProperties {
  totalCount: number
  pageSize: number
  siblingCount?: number
  currentPage: number
}

const DOTS = "..."
export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: IUsePaginationProperties) => {
  return useMemo(() => {
    if (totalCount <= 0 || pageSize <= 0) {
      return []
    }

    const totalPageCount = Math.ceil(totalCount / pageSize)

    if (currentPage < 1 || currentPage > totalPageCount) {
      return range(1, totalPageCount)
    }

    if (totalPageCount <= siblingCount + 5) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    )

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)
      return [...leftRange, DOTS, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      )
      return [1, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      if (currentPage < 3) {
        return [...range(1, 5), DOTS, totalPageCount]
      }
      return [1, DOTS, ...middleRange, DOTS, totalPageCount]
    }

    return range(1, totalPageCount)
  }, [totalCount, pageSize, siblingCount, currentPage])
}
