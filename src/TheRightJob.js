import React from "react";
import SearchJob from "./SearchJob";
import axios from "axios";

class TheRightJob extends React.Component {
    state = {
        showSearchJob: false,
        showBestJob: false,
        commonKeyWords: [],
        missingKeyWords: [],
        theMostSuitableJob: "",
        onlineJobDetails: [],

    }

    constructor(props) {
        super(props);
        this.commonKeyWords = [];
        this.missingKeyWords = [];
        this.theMostSuitableJob = "";
    }


    checkSuitableJob = () => {
        console.log("checkSuitableJob");
        let max = 0;
        let theMostSuitableJob = "";
        for (let i = 0; i < this.props.theMatchingPercentage.length; i++) {
            if (this.props.theMatchingPercentage[i] > max) {
                max = this.props.theMatchingPercentage[i];
                theMostSuitableJob = this.props.jobDescription[i];
            }
        }
        return theMostSuitableJob;
    };

    getTheMostSuitableJob = () => {
        console.log("getTheMostSuitableJob");
        const theMostSuitableJob = this.checkSuitableJob();
        for (let i = 0; i < this.props.jobDetails.length; i++) {
            if (this.props.jobDetails[i].jobName === theMostSuitableJob) {
                this.commonKeyWords = this.props.jobDetails[i].commonKeywords;
                this.missingKeyWords = this.props.jobDetails[i].missingKeywords;
                break;
            }
        }
        this.setState({
            theMostSuitableJob: theMostSuitableJob,
            showBestJob: true,
        })
    };

    // jobSuitability = () => {
    //     // send post request to server to get the most suitable job
    //     try{
    //         const response = axios.post('http://localhost:8080/api/compatibilityTest', null, {
    //             params: {
    //                 jobDetailText: this.props.jobDetails,
    //             }
    //         });
    //         this.setState({ sumOfCommonKeyWords: response.data });
    //
    //
    //     }catch(error){
    //         console.log(error);
    //     }
    // }


    renderTheMostSuitableJob = () => {
        return (
            <div className="the-right-job">
                <h1 className={"TitleMostJob"}>The Most Suitable Job:</h1>
                <h2 className={"TitleMostJob"}>{this.state.theMostSuitableJob}</h2>
                <p className={"name-right-job"}>
                    <strong>List of Common Keywords:</strong>
                </p>
                <ul className={"name-right-job"}>
                    {this.commonKeyWords.map((keyword, index) => (
                        <li key={index}>{keyword}</li>
                    ))}
                </ul>
                <p className={"name-right-job"}>
                    <strong>List of Missing Keywords:</strong>
                </p>
                <ul className={"name-right-job"}>
                    {this.missingKeyWords.map((keyword, index) => (
                        <li key={index}>{keyword}</li>
                    ))}
                </ul>
            </div>
        );
    };


    toggleSearchJob = () => {
        this.setState(prevState => ({
            showSearchJob: !prevState.showSearchJob
        }));
    }



    render() {
        return (
            <div>
                <div>
                    <button onClick={this.getTheMostSuitableJob}>View The Most Suitable Job</button>
                    {this.state.showBestJob ? this.renderTheMostSuitableJob() : null}
                </div>
                {/*A button that links to a page that displays the job search*/}
                <div className={"viewVacancies"}>
                    <button onClick={this.toggleSearchJob} disabled={!this.state.showBestJob}>View Vacancies
                    </button>
                </div>
                {this.state.showSearchJob ? <SearchJob
                    // onlineJobDetails={this.props.jobDetails}
                    // send the this.state.showBestJob to SearchJob.selectedJob
                    selectedJob={this.state.theMostSuitableJob} //להתחיל מפה לא עובד
                /> : null}
            </div>
        );
    }
}
export default TheRightJob;