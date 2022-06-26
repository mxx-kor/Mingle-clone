import React from 'react'
import { Routes as Switch, Route, Navigate} from 'react-router-dom'

import { Results } from './Results'

export function Routes() {
  return (
    <div className='p-4'>
      <Switch>
        <Route exact path='/' element={<Navigate replace to="/search" />} />
        {['/search', '/images', '/news', '/videos'].map(path => (
          <Route exact path={path} element={<Results />} />
        ))}
      </Switch>
    </div>
  )
}
