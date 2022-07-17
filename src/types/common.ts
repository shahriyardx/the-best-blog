import React from "react"

export type Children = string | React.ReactNode | React.ReactNode[] | JSX.Element | JSX.Element[] | null | undefined
export interface PostFormData {
  title: string
  description: string
  category: string
  visibility: string
} 