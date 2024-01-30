import './styles/App.css';
import React, { useState } from "react";
import Menu from "./Menu";
import checkingCvsAndJobLogo from "./styles/pictures/myLogo.png";
import scrollDowns from "./styles/pictures/scrollDowns.png";
import SearchJob from './SearchJob';
import CheckLocalJobDescription from "./CheckLocalJobDescription";
import aboutLogo from "./styles/pictures/aboutLogo.webp";
import About from "./About";
import styled from 'styled-components';

const Footer = styled.div`
    background-color: #f8f9fa;
    text-align: center;
    padding: 20px;
    position: fixed; /* תקבע את המיקום של האלמנט */
    bottom: 0; /* הזז את האלמנט לתחתית הדף */
    left: 0; /* הזז את האלמנט לצד שמאל של הדף */
`;

const FooterText = styled.p`
    color: #6c757d;
    font-size: 14px;
`;

const FooterLink = styled.a`
    color: #007bff;
    text-decoration: none;

    &:hover {
        color: #0056b3;
    }
`;

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
            {page === "about" ? <About /> :
                <Footer>
                    <FooterText>
                        <FooterText>Created by
                            <FooterLink href="https://www.linkedin.com/in/shoham-sofer/"
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={() => console.log('Link was clicked!')}> Shoham Sofer</FooterLink>
                        </FooterText>
                    </FooterText>
                </Footer>
            }
        </div>
    );
}

export default App;