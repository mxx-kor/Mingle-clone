import React from 'react'
import { Link } from 'react-router-dom'

import { Search } from './Search'

export function Navbar({ darkTheme, setDarkTheme }) {
  return (
    <div className='p-5 pb-0 flex flex-wrap sm:justify-between justify-center border-b dark:border-gray-700 border-gray-200'>
      <div className='flex justify-between items-center space-x-5 w-screen'>
        <Link to='/'>
          <p className='text-2xl'>
            Mingle
          </p>
        </Link>
        <button type="button" onClick={() => setDarkTheme(!darkTheme)} className="text-xl dark:bg-gray-900 dark:text-gray-200 bg-white border rounded-full px-2 py-1 hover:shadow-lg">
          {darkTheme ? '💡 Light' : '🌙 Dark'}
        </button>
      </div>
      <Search />
    </div>
  )
}
