import React from "react";
import SearchJob from "./SearchJob";
import "./styles/TheRightJob.css";

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


    renderTheMostSuitableJob = () => {
        return (
            <div className="TheRightJob-the-right-job">
                <h2 className="TheRightJob-job-title">The Most Suitable Job:</h2>
                <h3 className="TheRightJob-job-name">{this.state.theMostSuitableJob}</h3>

                <div className="TheRightJob-keywords-container">
                    <div className="TheRightJob-keyword-section">
                        <p className="TheRightJob-section-header">Common Keywords:</p>
                        <table className="TheRightJob-keyword-table">
                            <tbody>
                            {this.commonKeyWords.map((keyword, index) => (
                                <tr key={index}>
                                    <td className="TheRightJob-keyword">{keyword}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="TheRightJob-keyword-section">
                        <p className="TheRightJob-section-header">Missing Keywords:</p>
                        <table className="TheRightJob-keyword-table">
                            <tbody>
                            {this.missingKeyWords.map((keyword, index) => (
                                <tr key={index}>
                                    <td className="TheRightJob-keyword">{keyword}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
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
                <div className={"TheRightJob-viewVacancies"}>
                    <button onClick={this.toggleSearchJob} disabled={!this.state.showBestJob}>View Vacancies</button>
                </div>
                {this.state.showSearchJob ? <SearchJob selectedJob={this.state.theMostSuitableJob}/> : null}
            </div>
        );
    }
}

export default TheRightJob;