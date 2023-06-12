import React from "react";
import axios from "axios";
import JobInformation from "./JobInformation";

class Menu extends React.Component {
    state = {
        jobDescription: [],
        files: [],
        jobDetails: [],
        theMatchingPercentage: [],
        theMostSuitableJob: [],
        commonKeyWords: [],
        missingKeyWords: [],
        showJobInformation: false, // New state variable
        selectedJobIndex: null, // New state variable
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

    render() {
        const { jobDescription, jobDetails, theMatchingPercentage, showJobInformation, selectedJobIndex } = this.state;

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
                    <button onClick={() => this.setState({ showJobInformation: false, selectedJobIndex: null })}>
                        Back
                    </button>
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
                                View Information
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Menu;
