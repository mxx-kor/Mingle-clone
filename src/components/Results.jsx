import React from 'react'

export const Results = () => {
  return (
    <div>Results</div>
  )
}

// import React, {useContext, useEffect} from 'react';
// import { useLocation } from 'react-router-dom';

// import { useResultContext } from '../contexts/ResultContextProvider';
// import { Loading } from './Loading';

// export const Results = () => {
//   const { results, isLoading, getResults, searchTerm} = useResultContext();
//   const location = useLocation();

//   if(isLoading) return <Loading />

//   return (
//     <div>Results</div>
//   )
// }