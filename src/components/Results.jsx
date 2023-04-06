import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useResultContext } from '../contexts/ResultContextProvider';
import { Loading } from './Loading';

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === '/image') {
        getResults(
          `/imagesearch?query=${searchTerm}&gl=us&lr=en&num=10&start=0&sort=relevance`
        );
      } else {
        getResults(
          `/search?query=${searchTerm}&gl=us&lr=en&num=10&start=0&sort=relevance`
        );
      }
    }
  }, [searchTerm, location.pathname, getResults]);

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case '/search':
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.map(({ link, title, snippet }, index) => (
            <div
              key={index}
              className="md:w-2/5 w-full border-b dark:border-gray-700 border-gray-200 mb-2">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                <p className="text-sm">
                  {link?.length > 30
                    ? link.substring(0, 30)
                    : JSON.stringify(link)}
                </p>
                <p className="text-sm pb-4">
                  {snippet?.length > 30
                    ? snippet.substring(0, 200) + '...'
                    : snippet}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case '/image':
      return (
        <div className="flex flex-wrap justify-start items-center">
          {results?.map(({ contextLink, thumbnailImageUrl, title }, index) => (
            <a
              className="sm:p-3 p-5"
              href={contextLink}
              key={index}
              target="_blank"
              rel="noreferrer">
              <img src={thumbnailImageUrl} alt={title} loading="lazy" />
              <p className="w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );

    default:
      return 'ERORR!';
  }
};
