import React, { createContext, useState } from "react"
import config from "../config/config"

const WrapContext = createContext()
const WrapProvider = ({ children }) => {
  const [title, setTitle] = useState(config.siteTitle)
  const [modal, setModal] = useState("")
  let values = {
    title,
    setTitle,
    modal,
    setModal
  }
  return <WrapContext.Provider value={values}>{children}</WrapContext.Provider>
}

export default WrapContext
export { WrapProvider }
