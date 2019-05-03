import React from "react"
import { WrapProvider } from "./src/utils/wrapContext"

export const wrapRootElement = ({ element }) => {
  return <WrapProvider>{element}</WrapProvider>
}
