import React from "react";
import ReactDOM from 'react-dom';

class TheRightJob extends React.Component {
    state = {
        showBestJob: false,
        commonKeyWords: [],
        missingKeyWords: [],
        theMostSuitableJob: "",

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
        debugger;
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
        console.log("renderTheMostSuitableJob");
        return (
            <div className={"the-right-job"}>
                <h1>The Most Suitable Job</h1>
                <h2>{this.state.theMostSuitableJob}</h2>
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

    render() {
        return (
            <div>
                <button onClick={this.getTheMostSuitableJob}>View The Most Suitable Job</button>
                {this.state.showBestJob ? this.renderTheMostSuitableJob() : null}
            </div>
        );

    }
}
// ReactDOM.render(
//     <React.StrictMode>
//         <TheRightJob />
//     </React.StrictMode>,
//     document.getElementById('root')
// );
export default TheRightJob;
