import React, { createContext, useState } from "react"

const Context = createContext()
const Provider = ({ children }) => {
  const [lang, setLang] = useState(true)
  const [list, setList] = useState(true)
  let values = {
    lang,
    setLang,
    list,
    setList
  }
  return <Context.Provider value={values}>{children}</Context.Provider>
}

export default Context
export { Provider }
