import React, { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

import { useResultContext } from '../contexts/ResultContextProvider'
import { Links } from './Links'

export const Search = () => {
  const [text, setText] = useState('Elon Musk');
  const { setSearchTerm } = useResultContext();
  const [debouncedValue] = useDebounce(text, 500);

  useEffect(() => {
    if(debouncedValue) setSearchTerm(debouncedValue)
  }, [debouncedValue, setSearchTerm])

  return (
    <div className='relative md:ml-32 sm:-mt-10 mt-5'>
      <input
        value={text}
        type="text"
        className='lg:w-[800px] w-full h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg'
        placeholder='Search Mingle or type URL'
        onChange={(e) => setText(e.target.value)}
      />
      {text && (
        <button type='button' className='absolute top-2 right-4 text-2xl text-gray-700' onClick={() => setText('')}>
          X
        </button>
      )}
      <Links />
    </div>
  )
}
