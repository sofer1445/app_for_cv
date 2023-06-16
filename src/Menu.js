import React from "react";
import axios from "axios";
import JobInformation from "./JobInformation";
import TheRightJob from "./TheRightJob";
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom" ;
import PopularWords from "./PopularWords";


class Menu extends React.Component {
    state = {
        jobDescription: [],
        files: [],
        jobDetails: [],
        theMatchingPercentage: [],
        theMostSuitableJob: [], // מערך של כל המשרות בצורה של שם וכמות מילים משותפות (מפה)
        commonKeyWords: [],
        missingKeyWords: [],
        showJobInformation: false,
        selectedJobIndex: null,
        // showBestJob: false,
        // showPopularWords: false,
    };

    componentDidMount = async () => {
        const response = await axios.get("http://localhost:8080/api/file");
        console.log(response.data);
        const informationFiles = response.data;
        this.setState({
            jobDescription: informationFiles.jobDescription,
            files: informationFiles.files,
            jobDetails: informationFiles.jobDetailsArray,
            theMatchingPercentage: informationFiles.theMatchingPercentage,
            theMostSuitableJob: informationFiles.theMostSuitableJob,
        });
    };

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
    navLinkStyle = ({isActive}) => isActive ? {
        color: "white",
        backgroundColor: "red",
        margin: 50,
        align: "center" ,
        column : "center"
    } : undefined;


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
                                    showBestJob: false
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
                                    style={this.navLinkStyle}
                                    to={"/TheRightJob"}
                                    className={"nav"}
                                >
                                    TheRightJob
                                </NavLink>
                                <NavLink
                                    style={this.navLinkStyle}
                                    to={"/PopularWords"}
                                    className={"nav"}
                                >
                                    PopularWords
                                </NavLink>
                                <NavLink
                                    style={this.navLinkStyle}
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
                </div>
            </div>
        );
    }


}

export default Menu;