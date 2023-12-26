import './App.css';
import React, { useState } from "react";
import Menu from "./Menu";
import picWeb from "./picWebSite.png";
import SearchJob from './SearchJob';

function App() {
    const [page, setPage] = useState("menu");

    return (
        <div id="App">
            <div className="backPicWeb">
                <img
                    className={"picWebSite"}
                    src={picWeb}
                    alt={"picWebSite"}
                />
                <div className="display-container">
                    <button onClick={() => setPage("menu")} disabled={page === "menu"}>
                        Menu
                    </button>
                    <button onClick={() => setPage("searchJob")} disabled={page === "searchJob"}>
                        Search Job
                    </button>
                    {page === "menu" ? <Menu/> : <SearchJob/>}
                </div>
            </div>
        </div>
    );
}

export default App;