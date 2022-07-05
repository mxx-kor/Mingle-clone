import React from 'react'
import { TailSpin } from 'react-loader-spinner'

export const Loading = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <TailSpin color="grey" height={550} width={80} />
      Loading...
    </div>
  )
}
