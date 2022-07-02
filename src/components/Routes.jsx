import React from 'react'
import { Routes as Switch, Route, Navigate} from 'react-router-dom'
import { Main } from './Main'

import { Results } from './Results'

export function Routes() {
  return (
    <div className='p-4'>
      <Switch>
        <Route exact path='/' element={<Main />} />
        {['/search', '/image', '/news', '/video'].map((path, index) => (
          <Route exact path={path} key={index} element={<Results />} />
        ))}
      </Switch>
    </div>
  )
}
