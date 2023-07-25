'use client'
import React, { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext<any>({
  file: null,
  logs: [],
  json: null, 
  query: {}
});

export const ContextProvider = ({ children }: { children: React.ReactNode}) => {
  const [state, setState] = useState<any>({
    file: null,
    logs: [],
    json: null,
    query: {}
  })

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  )
}