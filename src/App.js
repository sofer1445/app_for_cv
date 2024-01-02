import './App.css';
import React, { useState } from "react";
import Menu from "./Menu";
import picForCvProj from "./picForCvProj.jpeg";
import checkingCvsAndJobLogo from "./checkingCvsAndJobLogo.png";
import scrollDowns from "./scrollDowns.png";
import SearchJob from './SearchJob';
import CheckLocalJobDescription from "./CheckLocalJobDescription";

function App() {
    const [page, setPage] = useState("menu");
    const [nameOfTheFile, setNameOfTheFile] = useState(null);
    const [showCheckLocalJobDescription, setShowCheckLocalJobDescription] = useState(false);

    const toggleCheckLocalJobDescription = () => {
        setShowCheckLocalJobDescription(!showCheckLocalJobDescription);
    }

    const handleButtonClick = (newPage) => {
        setPage(newPage);
        setShowCheckLocalJobDescription(false);
    }

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
                <button className="buttonApp" onClick={() => handleButtonClick("menu")} disabled={page === "menu"}>
                    Menu
                </button>
                <button className="buttonApp" onClick={() => handleButtonClick("searchJob")} disabled={page === "searchJob"}>
                    Search Job
                </button>
                <button className="buttonApp" onClick={toggleCheckLocalJobDescription}>
                    To check a custom job description click here
                </button>
                {showCheckLocalJobDescription ? <CheckLocalJobDescription cvFileName={nameOfTheFile} /> : null}
                {page === "menu" ? <Menu onFileNameChange={setNameOfTheFile}/> : <SearchJob cvFileName={nameOfTheFile}/>}
            </div>
        </div>
    );
}
export default App;