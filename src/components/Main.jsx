import React, { useState } from 'react'
import { Footer } from './Footer';
import { useNavigate } from 'react-router-dom';
import { useResultContext } from '../contexts/ResultContextProvider';

export const Main = ({ darkTheme, setDarkTheme }) => {
  const [text, setText] = useState('');
  const { searchTerm, setSearchTerm } = useResultContext();
  const navigate = useNavigate();

  return (
    <div className='min-h-screen'>
      <div className='flex flex-col items-center'>
        <button type="button" onClick={() => setDarkTheme(!darkTheme)} className="text-xl dark:bg-gray-900 dark:text-gray-200 bg-white border rounded-full px-2 py-1 hover:shadow-lg">
            {darkTheme ? '💡 Light' : '🌙 Dark'}
        </button>
        <h1 className="text-center lg:text-9xl text-8xl mt-[230px] pb-14 font-bold">
          <span>M</span><span>i</span><span>n</span><span>g</span><span>l</span><span>e</span>
        </h1>
        <div className='relative'>
          <input
            value={text}
            type="text" 
            className='lg:w-[500px] w-4/5 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg' 
            placeholder='Search Mingle or type URL'
            onChange={(e) => {
              setText(e.target.value)
            }}
            onKeyUp={(e) => {if(e.key === "Enter") {
              setSearchTerm(text);
              navigate('/search');
            }}}
          />
          {text && (
            <button type='button' className='absolute top-2 right-4 text-2xl text-gray-700' onClick={() => setText('')}>
              X
            </button>
          )}
        </div>
      </div> 
      <Footer />  
    </div>
  )
}
