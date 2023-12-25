import './App.css';
import React from "react";
import Menu from "./Menu";
import picWeb from "./picWebSite.png";
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom" ;
import FileUpload from "./FileUpload";
import SearchJob from './SearchJob';

const navLinkStyle = ({isActive}) => isActive ? {
    color: "white",
    backgroundColor: "red",
    margin: 50,
    align: "center",
    column: "center"
} : undefined;

function App() {
    return (
        <div id="App">
            <div className="backPicWeb">
                <img
                    className={"picWebSite"}
                    src={picWeb}
                    alt={"picWebSite"}
                />
                <div className="display-container">
                    <Menu />
                </div>
            </div>
            <SearchJob />
        </div>
    );
}

export default App;
//<div className="backPicWeb">
//                 <img
//                     className={"picWebSite"}
//                     src={picWeb}
//                     alt={"picWebSite"}
//                 />
//                 <div className="display-container">
//                     <Menu />
//                 </div>
//             </div>