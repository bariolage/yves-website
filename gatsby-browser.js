import React from "react"
import { Provider } from "./src/components/store"

export const wrapRootElement = ({ element }) => {
  return <Provider>{element}</Provider>
}
