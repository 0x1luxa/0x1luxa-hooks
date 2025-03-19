# @0x1luxa/hooks

A collection of hooks for React, designed to simplify state management and interaction with web3.

## Installation

To install the package, use npm or yarn:

```bash
npm install @0x1luxa/hooks
```

or

```bash
yarn add @0x1luxa/hooks
```

## Usage

### Common Hooks

#### useClipboard

A hook to copy text to the clipboard.

**Example:**

```typescript
import { useClipboard } from "@0x1luxa/hooks"

const Component = () => {
  const [copy] = useClipboard()

  return (
    <button onClick={() => copy("Text to copy")}>
      Copy to Clipboard
    </button>
  )
}
```

#### useDeviceWidth

A hook to determine the device width and breakpoints.

**Example:**

```typescript
import { useDeviceWidth } from "@0x1luxa/hooks"

const Component = () => {
  const { isBelowDesktop, isTablet, isMobile } = useDeviceWidth()

  return (
    <div>
      {isMobile && <p>Mobile View</p>}
      {isTablet && <p>Tablet View</p>}
      {isBelowDesktop && <p>Below Desktop View</p>}
    </div>
  )
}
```

#### useDimensions

A hook to get the dimensions of a DOM element.

**Example:**

```typescript
import { useDimensions } from "@0x1luxa/hooks"
import { useRef } from "react"

const Component = () => {
  const ref = useRef<HTMLDivElement>(null)
  const dimensions = useDimensions(ref)

  return (
    <div ref={ref}>
      Width: {dimensions.width}, Height: {dimensions.height}
    </div>
  )
}
```

#### useDisclosure

A hook to manage the open/close state of a component.

**Example:**

```typescript
import { useDisclosure } from "@0x1luxa/hooks"

const Component = () => {
  const [isOpen, { open, close, toggle }] = useDisclosure()

  return (
    <div>
      <button onClick={toggle}>Toggle</button>
      {isOpen && <p>Content is open</p>}
    </div>
  )
}
```

#### useLocalStorage

A hook to manage state with local storage.

**Example:**

```typescript
import { useLocalStorage } from "@0x1luxa/hooks"

const Component = () => {
  const [value, setValue] = useLocalStorage("key", "default")

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
```

#### usePagination

A hook to handle pagination logic.

**Example:**

```typescript
import { usePagination } from "@0x1luxa/hooks"

const Component = () => {
  const { currentPage, totalPages, setPage } = usePagination(10, 100)

  return (
    <div>
      <button onClick={() => setPage(currentPage - 1)}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={() => setPage(currentPage + 1)}>Next</button>
    </div>
  )
}
```

#### useToggleBooleanState

A hook to toggle a boolean state every 1.5 seconds when data is available.

**Example:**

```typescript
import { useToggleEvery1_5Sec } from "@0x1luxa/hooks"

const Component = ({ data }) => {
  const [toggle, resetToggle] = useToggleEvery1_5Sec(data)

  return (
    <div>
      <p>Toggle is {toggle ? "ON" : "OFF"}</p>
      <button onClick={resetToggle}>Reset</button>
    </div>
  )
}
```

### Web3 Hooks

#### useApproveToken

A hook to handle token approval transactions.

**Example:**

```typescript
import { useApproveToken } from "@0x1luxa/hooks"

const Component = () => {
  const { approve, isLoading } = useApproveToken({
    tokenAddress: "0xTokenAddress",
    spenderAddress: "0xSpenderAddress",
    amount: BigInt(1000),
  })

  return (
    <button onClick={approve} disabled={isLoading}>
      Approve Token
    </button>
  )
}
```

#### useTokenBalance

A hook to get the balance of a token.

**Example:**

```typescript
import { useTokenBalance } from "@0x1luxa/hooks"

const Component = () => {
  const balance = useTokenBalance("0xTokenAddress")

  return <div>Token Balance: {balance}</div>
}
```

## Scripts

- **build**: Compiles the TypeScript code to JavaScript.
- **patch-push**: Increments the patch version and pushes the tags to the repository.

## Development

To build the project, run:

```bash
npm run build
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Author

0x1luxa

## Keywords

- hooks
- react
- web3
