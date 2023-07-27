'use client'
import React, { createContext } from "react";
import { useState } from "react";

export const SearchContext = createContext<any>('');

export const SearchProvider = ({ children }: { children: React.ReactNode}) => {
  const [search, setSearch] = useState<any>('')

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  )
}