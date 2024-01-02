import React from "react";
import SearchJob from "./SearchJob";

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
            <div className="the-right-job">
                <h2>The Most Suitable Job:</h2>
                <h3>{this.state.theMostSuitableJob}</h3>
                <div className="keywords-container">
                    <div>
                        <p className={"pOfTheRight"}>List of Common Keywords: </p>
                        <table>
                            <tbody>
                            {this.commonKeyWords.map((keyword, index) => (
                                <tr key={index}>
                                    <td>{keyword}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p className={"pOfTheRight"}>List of Missing Keywords: </p>
                        <table>
                            <tbody>
                            {this.missingKeyWords.map((keyword, index) => (
                                <tr key={index}>
                                    <td>{keyword}</td>
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
                <div className={"viewVacancies"}>
                    <button onClick={this.toggleSearchJob} disabled={!this.state.showBestJob}>View Vacancies</button>
                </div>
                {this.state.showSearchJob ? <SearchJob selectedJob={this.state.theMostSuitableJob} /> : null}
            </div>
        );
    }
}
export default TheRightJob;