import React from "react";

const App = () => {
    return (
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
    )
}

export default App;