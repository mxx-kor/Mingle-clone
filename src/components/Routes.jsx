import React, { useState } from 'react'
import { Routes as Switch, Route} from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

import { Results } from './Results'

export function Routes() {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <div className={darkTheme ? 'dark' : ''}>
      <div className="dark:bg-gray-900 bg-gray-100 dark:text-gray-200 black min-h-screen">
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
        <Switch>
          {['/search', '/image', '/news', '/video'].map((path, index) => (
            <Route exact path={path} key={index} element={<Results />} />
          ))}
        </Switch>
        <Footer />
      </div>
    </div>
  )
}
