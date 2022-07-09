import React from 'react'
import { Routes as Switch, Route} from 'react-router-dom'

import { Navbar } from './Navbar'
import { Results } from './Results'
import { Maps } from './Maps'

export function Routes({ darkTheme, setDarkTheme }) {

  return (
    <div className={darkTheme ? 'dark' : ''}>
      <div className="dark:bg-gray-900 bg-gray-100 dark:text-gray-200 black min-h-screen">
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <Switch>
          {['/search', '/image', '/news', '/video'].map((path, index) => (
            <Route exact path={path} key={index} element={<Results />} />
          ))}
          <Route exact path='/maps' element={<Maps />} />
        </Switch>
      </div>
    </div>
  )
}
