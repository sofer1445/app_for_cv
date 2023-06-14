import React from "react";
import axios from "axios";
import JobInformation from "./JobInformation";
import TheRightJob from "./TheRightJob";
import {BrowserRouter, Route} from "react-router-dom";


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
        showBestJob: false,
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

    // checkTheMostSuitableJob = () => {
    //     let max = 0;
    //     let theMostSuitableJob = "";
    //     const { theMatchingPercentage, jobDescription } = this.state;
    //     for (let i = 0; i < theMatchingPercentage.length; i++) {
    //         if (theMatchingPercentage[i] > max) {
    //             max = theMatchingPercentage[i];
    //             theMostSuitableJob = jobDescription[i];
    //         }
    //     }
    //     return theMostSuitableJob;
    //
    // }
    // getTheMostSuitableJob = () => {
    //     debugger;
    //     const { jobDetails } = this.state;
    //     let theMostSuitableJob = this.checkTheMostSuitableJob();
    //     let commonKeyWords = [];
    //     let missingKeyWords = [];
    //     for (let i = 0; i < jobDetails.length; i++) {
    //         if (jobDetails[i].jobName === theMostSuitableJob) {
    //             commonKeyWords = jobDetails[i].commonKeywords;
    //             missingKeyWords = jobDetails[i].missingKeywords;
    //         }
    //     }
    //     this.setState({
    //         theMostSuitableJob: theMostSuitableJob,
    //         commonKeyWords: commonKeyWords,
    //         missingKeyWords: missingKeyWords,
    //         showBestJob: true,
    //     });
    //
    // }
    //
    //
    // renderTheMostSuitableJob = () => {
    //     const { theMostSuitableJob, commonKeyWords, missingKeyWords } = this.state;
    //     return (
    //         <div>
    //             <h1>The Most Suitable Job</h1>
    //             <h2>{theMostSuitableJob}</h2>
    //             <p>
    //                 <strong>List of Common Keywords:</strong>
    //             </p>
    //             <ul>
    //                 {commonKeyWords.map((keyword, index) => (
    //                     <li key={index}>{keyword}</li>
    //                 ))}
    //             </ul>
    //             <p>
    //                 <strong>List of Missing Keywords:</strong>
    //             </p>
    //             <ul>
    //                 {missingKeyWords.map((keyword, index) => (
    //                     <li key={index}>{keyword}</li>
    //                 ))}
    //             </ul>
    //             <button onClick={() => this.setState({ showBestJob: false })}>
    //                 Back
    //             </button>
    //         </div>
    //     );
    //
    //
    //
    // }


    render() {
        const {
            jobDescription,
            jobDetails,
            theMatchingPercentage,
            showJobInformation,
            selectedJobIndex,
            showBestJob
        } = this.state;

        if (showJobInformation) {
            const job = jobDescription[selectedJobIndex];
            const listKeyWords = jobDetails[selectedJobIndex].keywords;
            const listCommonKeywords = jobDetails[selectedJobIndex].commonKeywords;
            const listMissingKeywords = jobDetails[selectedJobIndex].missingKeywords;
            const matchingPercentage = theMatchingPercentage[selectedJobIndex];

            return (
                <div>
                    <JobInformation
                        job={job}
                        listKeyWords={listKeyWords}
                        listCommonKeywords={listCommonKeywords}
                        listMissingKeywords={listMissingKeywords}
                        matchingPercentage={matchingPercentage}
                    />
                    <button onClick={() => this.setState({
                        showJobInformation: false,
                        selectedJobIndex: null,
                        showBestJob: false
                    })}>
                        Back
                    </button>
                    {/*// try to call the component TheRightJob*/}
                    <button onClick={() => this.buttonViewBestJob()}> The Most Suitable Job</button>
                    {showBestJob ? <TheRightJob theMatchingPercentage={theMatchingPercentage}
                                                jobDescription={jobDescription}
                                                jobDetails={jobDetails}
                                                commonKeyWords={listCommonKeywords}
                                                missingKeyWords={listMissingKeywords}
                    /> : null}
                    {/*<button onClick={() => this.buttonViewBestJob()}> The Most Suitable Job</button>*/}
                    {/*<button onClick={() => this.getTheMostSuitableJob()}> The Most Suitable Job</button>*/}
                    {/*{this.state.showBestJob ? this.renderTheMostSuitableJob() : null}*/}
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
                            <button id="buttonViewInformation" onClick={() => this.buttonViewInformation(indexJob)}>
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