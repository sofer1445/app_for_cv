import React from "react";
import axios from "axios";
import JobInformation from "./JobInformation";
import TheRightJob from "./TheRightJob";
import {BrowserRouter, NavLink, Route, Routes} from "react-router-dom";
import PopularWords from "./PopularWords";
import NavLinkStyle from "./NavLinkStyle";
import FileUpload from "./FileUpload";
import myLogo from "./myLogo.png";
import hoPic from "./hoPic.jpeg";
import "./styles/Menu.css";

class Menu extends React.Component {
    state = {
        jobDescription: [],
        files: [],
        jobDetails: [],
        theMatchingPercentage: [],
        theMostSuitableJob: [],
        showJobInformation: false,
        selectedJobIndex: null,
        nameOfTheFile: null,
        showNameFile: false,
        background: hoPic,
    };

    fileName = (string) => {
        this.setState({
            nameOfTheFile: string,
        }, () => {
            this.props.onFileNameChange(string);
        });
    }

    handleButtonClick = () => {
        this.setState({background: myLogo});
    }

    extractTheNameFromTheString = (string) => {
        let name = string.split("\\");
        return name[name.length - 1];
    }

    componentDidMount = async () => {
        await this.fetchData();
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedJobIndex !== this.state.selectedJobIndex) {
            this.fetchData();
        }
    }

    fetchData = async () => {
        const response = await axios.get("http://localhost:8080/api/file");
        const informationFiles = response.data;
        this.setState({
            jobDescription: informationFiles.jobDescription,
            files: informationFiles.files,
            jobDetails: informationFiles.jobDetailsArray,
            theMatchingPercentage: informationFiles.theMatchingPercentage,
            theMostSuitableJob: informationFiles.theMostSuitableJob,
            nameOfTheFile: informationFiles.cvFile,
        });
    };

    buttonViewInformation = (indexJob) => {
        this.setState({
            showJobInformation: true,
            selectedJobIndex: indexJob,
        });
    };
    handleJobSelection = (event) => {
        this.setState({selectedJob: event.target.value});
    }

    renderJobList = () => {
        return (
            <div className={"Menu-select and button"}>
                <select className={"Menu-select-input"} onChange={this.handleJobSelection}>
                    <option id={"Menu-SelectOp"} value={""}>Select Job</option>
                    {this.state.jobDescription.map((job, indexJob) => (
                        <option key={indexJob} value={indexJob}>
                            {job}
                        </option>
                    ))}
                </select>
                <button
                    id="Menu-buttonViewInformation"
                    onClick={() => {
                        this.buttonViewInformation(this.state.selectedJob);
                        this.handleButtonClick();
                    }}
                >
                    View information
                </button>
            </div>
        );
    }

    render() {
        const {
            jobDescription,
            jobDetails,
            theMatchingPercentage,
            showJobInformation,
            selectedJobIndex,
        } = this.state;

        if (showJobInformation) {
            const job = jobDescription[selectedJobIndex];
            const listKeyWords = jobDetails[selectedJobIndex].keywords;
            const listCommonKeywords = jobDetails[selectedJobIndex].commonKeywords;
            const listMissingKeywords = jobDetails[selectedJobIndex].missingKeywords;
            const matchingPercentage = theMatchingPercentage[selectedJobIndex];

            return (
                <div className="Menu-job-information-container">
                    <div className="Menu-job-information">
                        <button
                            className="Menu-back-button"
                            onClick={() =>
                                this.setState({
                                    showJobInformation: false,
                                    selectedJobIndex: null,
                                    showBestJob: false,
                                    showNameFile: true,
                                })
                            }
                        >
                            Back
                        </button>
                        <JobInformation
                            job={job}
                            listKeyWords={listKeyWords}
                            listCommonKeywords={listCommonKeywords}
                            listMissingKeywords={listMissingKeywords}
                            matchingPercentage={matchingPercentage}
                        />
                    </div>
                    <div className="Menu-links-container">
                        <BrowserRouter>
                            <div className="Menu-links">
                                <NavLink
                                    style={NavLinkStyle}
                                    to={"/TheRightJob"}
                                    className={"Menu-nav"}
                                >
                                    TheRightJob
                                </NavLink>
                                <NavLink
                                    style={NavLinkStyle}
                                    to={"/PopularWords"}
                                    className={"Menu-nav"}
                                >
                                    PopularWords
                                </NavLink>
                                <NavLink
                                    style={NavLinkStyle}
                                    to={"/"}
                                    className={"Menu-nav"}
                                >
                                    Back
                                </NavLink>
                            </div>
                            <Routes>
                                <Route
                                    path={"/TheRightJob"}
                                    element={
                                        <TheRightJob
                                            theMatchingPercentage={theMatchingPercentage}
                                            jobDescription={jobDescription}
                                            jobDetails={jobDetails}
                                            commonKeyWords={listCommonKeywords}
                                            missingKeyWords={listMissingKeywords}
                                        />
                                    }
                                />
                                <Route
                                    path={"/PopularWords"}
                                    element={
                                        <PopularWords
                                            jobDetails={jobDetails}
                                        />
                                    }
                                />
                                <Route
                                    path={"/"}
                                    element={() => {
                                        this.setState({
                                            showJobInformation: false,
                                            selectedJobIndex: null,
                                            showBestJob: false,
                                            showPopularWords: false

                                        });
                                    }}
                                />
                            </Routes>
                        </BrowserRouter>
                    </div>
                </div>
            );
        }

        return (
            <>
                <div>
                    <div>
                        <h1 id={"Menu-WebTitle"} style={{
                            color: '#34495e',
                            textAlign: 'center',
                            backgroundColor: '#ecf0f1',
                            fontFamily: 'Arial'
                        }}>Welcome to the CV checking and job search website</h1>
                        <FileUpload
                            fileName={this.fileName}
                            style={{display: 'flex', justifyContent: 'center'}}
                        />
                        <h2 id={"Menu-secondTitle"} style={{
                            color: '#2c3e50',
                            textAlign: 'center',
                            backgroundColor: '#bdc3c7',
                            fontFamily: 'Arial'
                        }}>List Of Jobs</h2>
                    </div>
                    <div className={"Menu-renderJobList"}
                         style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        {this.renderJobList()}
                    </div>
                    <div>
                        {this.state.showNameFile && this.state.nameOfTheFile && (
                            <div style={{textAlign: 'center'}}>
                                <h5 id={"Menu-nameOfFile"}>Presents data according to the
                                    following
                                    CV: {this.extractTheNameFromTheString(this.state.nameOfTheFile)}</h5>
                            </div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default Menu;