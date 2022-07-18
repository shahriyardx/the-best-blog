import React from 'react'
import { RiDoubleQuotesL } from 'react-icons/ri'
import { BiBold, BiItalic, BiStrikethrough, BiLinkAlt, BiImage, BiListUl, BiListOl, BiCodeAlt } from 'react-icons/bi'
import ToolbarButton from './ToolbarButton'
import ToolbarButtons from './ToolbarButtons'

type Props = {
  mdCommand: (command: string) => void
}

const Toolbar = ({ mdCommand }: Props) => {
  return (
    <div className='flex flex-wrap gap-2 sm:gap-5 p-3 border-b-[1px] border-b-[orange] dark:border-b-zinc-600'>
      <ToolbarButtons>
        <ToolbarButton mdCommand={mdCommand} command='bold'>
          <BiBold />
        </ToolbarButton>

        <ToolbarButton mdCommand={mdCommand} command='italic'>
          <BiItalic />
        </ToolbarButton>

        <ToolbarButton mdCommand={mdCommand} command='strike-through'>
          <BiStrikethrough />
        </ToolbarButton>
      </ToolbarButtons>

      <ToolbarButtons>
        <ToolbarButton mdCommand={mdCommand} command='h1'>
          <span className='text-sm'>
            H1
          </span>
        </ToolbarButton>
        <ToolbarButton mdCommand={mdCommand} command='h2'>
        <span className='text-sm'>
            H2
          </span>
        </ToolbarButton>
        <ToolbarButton mdCommand={mdCommand} command='h3'>
          <span className='text-sm'>
            H3
          </span>
        </ToolbarButton>
        <ToolbarButton mdCommand={mdCommand} command='h4'>
          <span className='text-sm'>
            H4
          </span>
        </ToolbarButton>
        <ToolbarButton mdCommand={mdCommand} command='h5'>
          <span className='text-sm'>
            H5
          </span>
        </ToolbarButton>
        <ToolbarButton mdCommand={mdCommand} command='h6'>
          <span className='text-sm'>
            H6
          </span>
        </ToolbarButton>
      </ToolbarButtons>

      <ToolbarButtons>
        <ToolbarButton mdCommand={mdCommand} command='link'>
          <BiLinkAlt />
        </ToolbarButton>
        <ToolbarButton mdCommand={mdCommand} command='image'>
          <BiImage />
        </ToolbarButton>
        <ToolbarButton mdCommand={mdCommand} command='unordered-list'>
          <BiListUl />
        </ToolbarButton>
        <ToolbarButton mdCommand={mdCommand} command='ordered-list'>
          <BiListOl />
        </ToolbarButton>
        <ToolbarButton mdCommand={mdCommand} command='block-quotes'>
          <RiDoubleQuotesL />
        </ToolbarButton>
        <ToolbarButton mdCommand={mdCommand} command='code-block'>
          <BiCodeAlt />
        </ToolbarButton>
      </ToolbarButtons>
    </div>
  )
}

export default Toolbar