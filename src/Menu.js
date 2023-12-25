import React from "react";
import axios from "axios";
import JobInformation from "./JobInformation";
import TheRightJob from "./TheRightJob";
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom" ;
import PopularWords from "./PopularWords";
import NavLinkStyle from "./NavLinkStyle";
import FileUpload from "./FileUpload";


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
    };


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

    componentDidMount = async () => {
        await this.fetchData();
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedJobIndex !== this.state.selectedJobIndex) {
            this.fetchData();
        }

    }

    buttonViewInformation = (indexJob) => {
        this.setState({
            showJobInformation: true,
            selectedJobIndex: indexJob,
        });
    };

    buttonViewBestJob = () => {
        console.log("buttonViewBestJob");
        this.setState({
            showBestJob: true,
        });
    }
    fileName = (string) => {
        this.setState({
            nameOfTheFile: string,
            // showNameFile: true,
        })
        return (
            <div>
                <h5 id={"nameOfFile"}>The file is: {this.state.nameOfTheFile}</h5>
            </div>
        )


    }
    extractTheNameFromTheString = (string) => {
        let name = string.split("\\");
        return name[name.length - 1];
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
                <div className="job-information-container">
                    <div className="job-information">
                        <button
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
                    <div className="links-container">
                        <BrowserRouter>
                            <div className="links">
                                <NavLink
                                    style={NavLinkStyle}
                                    to={"/TheRightJob"}
                                    className={"nav"}
                                >
                                    TheRightJob
                                </NavLink>
                                <NavLink
                                    style={NavLinkStyle}
                                    to={"/PopularWords"}
                                    className={"nav"}
                                >
                                    PopularWords
                                </NavLink>
                                <NavLink
                                    style={NavLinkStyle}
                                    to={"/"}
                                    className={"nav"}
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
            <div>
                <h1>List Of Jobs</h1>
                <div>
                    <div>
                        <FileUpload
                            fileName={this.fileName}
                        />
                        {this.state.showNameFile ? (
                            <div>
                                <h5 id={"nameOfFile"}>Presents data according to the following
                                    CV: {this.extractTheNameFromTheString(this.state.nameOfTheFile)}</h5>
                            </div>
                        ) : null}
                    </div>

                    {jobDescription.map((job, indexJob) => (
                        <div key={indexJob}>
                            <p id="Jobs">{job}</p>
                            <button
                                id="buttonViewInformation"
                                onClick={() => this.buttonViewInformation(indexJob)}
                            >
                                View information
                            </button>
                        </div>
                    ))}
                    <div>


                    </div>
                </div>
            </div>
        );
    }


}

export default Menu;
