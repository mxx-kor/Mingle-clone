import React, { useState } from "react";
import { Routes } from './components/Routes'
import { Route, Routes as Switch } from "react-router-dom";

import { Main } from "./components/Main";
import { Footer } from "./components/Footer";

const App = () => {
    const [darkTheme, setDarkTheme] = useState(true);

    return (
        <div className={darkTheme ? 'dark' : ''}>
            <div className="dark:bg-gray-900 bg-gray-100 dark:text-gray-200 black min-h-screen">
                <Switch>
                    <Route exact path='/' element={<Main darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} />
                    <Route path='/*' element={<Routes darkTheme={darkTheme} setDarkTheme={setDarkTheme} />} />
                </Switch>
                <Footer />  
            </div>
        </div>
    )
}

export default App;