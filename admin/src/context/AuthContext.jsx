import React, { createContext } from 'react'

export const authDataContext = createContext() // context api create = create provider consumer 

const AuthContext = ({children}) => {
    let serverUrl = "https://varuno-bbjw.onrender.com"
     let value = {
        serverUrl
     }
  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
