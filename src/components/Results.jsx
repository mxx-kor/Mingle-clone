import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useResultContext } from '../contexts/ResultContextProvider';
import { Loading } from './Loading';

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if(location.pathname === "/video") {
        getResults(`/search/q=${searchTerm} videos`)
      } else {
          getResults(`${location.pathname}/q=${searchTerm}&num=20`)
      }
    }
  }, [searchTerm, location.pathname, getResults]);

  if(isLoading) return <Loading />;

  switch (location.pathname) {
    case '/search':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
          {results?.map(({ link, title, description }, index) => (
            <div key={index} className="md:w-2/5 w-full border-b dark:border-gray-700 border-gray-200 mb-2">
              <a href={link} target="_blank" rel='noreferrer'>
                <p className='text-sm'>
                  {link?.length > 30 ? link.substring(0, 30) : JSON.stringify(link)}
                </p>
                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                  {title}
                </p>
                <p className='text-sm pb-4'>
                  {description?.length > 30 ? description.substring(0, 200) + "..." : description}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case '/image':
      return (
        <div className='flex flex-wrap justify-start items-center'>
          {results?.map(({ image, link: { href, title } }, index) => (
            <a className='sm:p-3 p-5' href={href} key={index} target="_blank" rel='noreferrer'>
              <img src={image?.src} alt={title} loading="lazy" />
              <p className='w-36 break-words text-sm mt-2'>
                {title}
              </p>
            </a>
          ))}
        </div>
      );
    case '/news':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56 items-center'>
          {results?.length === 0 ? <div className='mt-[500px] text-4xl text-center'>No Result 😥</div> : 
            results?.slice(0, 20)?.map(({ links, source, title }, index) => (
              <div className="md:w-2/5 w-full border-b dark:border-gray-700 border-gray-200 mb-2" key={index}>
                <a href={links?.[0].href} target="_blank" rel='noreferrer' className='hover:underline'>
                  <p className='text-lg dark:text-blue-300 text-blue-700'>
                    {title}
                  </p>
                </a>
                <div className='flex pb-4'>
                  <a href={source?.href} target="_blank" rel='noreferrer'>
                    {source?.href}
                  </a>
                </div>
              </div>
            ))
          }
        </div>
      );
    case '/video':
      return (
        <div className='flex flex-wrap'>
          {results?.map((video, index)=> (
            <div key={index} className='p-2'>
              <p className='text-sm mt-2 mb-2'>
                {video?.title?.length > 50 ? video?.title.substring(0, 50) + "..." : video?.title}
              </p>
              {video?.additional_links?.[0]?.href && <ReactPlayer url={video.additional_links?.[0].href} controls width='355px' height='200px' />}
            </div>
          ))}
        </div>
      ); 
  
    default:
      return 'ERORR!';
  }
}