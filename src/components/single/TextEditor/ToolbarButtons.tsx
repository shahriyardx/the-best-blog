import React from 'react'
import { Children } from "src/types/common";

type Props = {
  children: Children
}

const ToolbarButtons = ({ children }: Props) => {
  return (
    <div className='
        rounded-md overflow-hidden flex 
        [&>*]:flex [&>*]:items-center 
        [&>*]:justify-center [&>*]:bg-[orange] 
        [&>*]:dark:bg-zinc-900
        [&>*]:w-9 [&>*]:h-9 [&>*]:dark:text-zinc-300
        [&>*]:cursor-pointer
      '
    >
      {children}
    </div>
  )
}

export default ToolbarButtons