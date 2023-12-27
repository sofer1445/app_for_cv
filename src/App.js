import './App.css';
import React, { useState } from "react";
import Menu from "./Menu";
import picForCvProj from "./picForCvProj.jpeg";
import checkingCvsAndJobLogo from "./checkingCvsAndJobLogo.png";
import scrollDowns from "./scrollDowns.png";
import SearchJob from './SearchJob';

function App() {
    const [page, setPage] = useState("menu");

    return (
        <div id="App">
            <img className="logo" src={checkingCvsAndJobLogo} alt="Logo" />
            <div className="scroll-downs">
                <img className={"scroll"} src={scrollDowns} alt="Scroll down" />
                <div className="mousey">
                    <div className="scroller"></div>
                </div>
            </div>
            <div className="display-container">
                <button className="buttonApp" onClick={() => setPage("menu")} disabled={page === "menu"}>
                    Menu
                </button>
                <button className="buttonApp" onClick={() => setPage("searchJob")} disabled={page === "searchJob"}>
                    Search Job
                </button>
                {page === "menu" ? <Menu/> : <SearchJob/>}
            </div>
        </div>
    );
}

export default App;