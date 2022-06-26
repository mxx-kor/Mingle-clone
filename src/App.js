import React, { useState } from "react";
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { Routes } from './components/Routes'

const App = () => {
    const [darkTheme, setDarkTheme] = useState(false);

    return (
        <div className={darkTheme ? 'dark' : ''}>
            <div className="dark:bg-gray-900 bg-gray-100 dark:text-gray-200 black min-h-screen">
                <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
                <div>
                    <h1 className="text-center mt-[230px]">
                        <span>M</span><span>i</span><span>n</span><span>g</span><span>l</span><span>e</span>
                    </h1> 
                    <form action="https://www.google.com/search" method="GET">
                        <div>
                            <input className="ml-6" name="q" type="text" placeholder="Mingle search 또는 URL입력" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        </div>
                    </form>
                </div>
                <Routes />
                <Footer />
            </div>
        </div>
    )
}

export default App;