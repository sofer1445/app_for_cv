import './styles/App.css';
import React, { useState } from "react";
import Menu from "./Menu";
import checkingCvsAndJobLogo from "./myLogo.png";
import scrollDowns from "./scrollDowns.png";
import SearchJob from './SearchJob';
import CheckLocalJobDescription from "./CheckLocalJobDescription";
import aboutLogo from "./aboutLogo.webp";
import About from "./About";

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

    const handleAboutClick = () => {
        setPage("about");
        setShowCheckLocalJobDescription(false);
    }

    return (
        <div id="App-App">
            <img className="App-logo" src={checkingCvsAndJobLogo} alt="Logo"/>
            <div className="App-scroll-downs">
                <img className={"App-scroll"} src={scrollDowns} alt="Scroll down"/>
                <div className="App-mousey">
                    <div className="App-scroller"></div>
                </div>
            </div>
            <div className="App-display-container">
                <button className="App-buttonApp" onClick={() => handleButtonClick("menu")} disabled={page === "menu"}>
                    Menu
                </button>
                <button className="App-buttonApp" onClick={() => handleButtonClick("searchJob")}
                        disabled={page === "searchJob"}>
                    Search Job
                </button>
                <button className="App-buttonApp" onClick={toggleCheckLocalJobDescription}
                        title="To check a custom job description click here">
                    Custom inspection
                </button>
                {showCheckLocalJobDescription ? <CheckLocalJobDescription cvFileName={nameOfTheFile}/> : null}
                {page === "menu" ? <Menu onFileNameChange={setNameOfTheFile}/> :
                    <SearchJob cvFileName={nameOfTheFile}/>}
            </div>
            <img className={"App-aboutLogo"} src={aboutLogo} alt={"aboutLogo"}
                 onClick={handleAboutClick}/>
            {page === "about" ? <About /> : null}
        </div>
    );
}

export default App;