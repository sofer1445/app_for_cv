import React from "react";
import axios from "axios";
import {click} from "@testing-library/user-event/dist/click";

class Menu extends React.Component {
    state = {
        jobDescription: [],
        files: [],
        jobDetails: [],
        theMatchingPercentage: [],
        theMostSuitableJob: [],
        commonKeyWords: [],
        missingKeyWords: []

    }

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


    }

    buttonViewInformation = (event) => {
        return (
            <div>
                <table className={"table"}>
                    <tbody>
                    <tr>
                        <th> Job</th>
                        <th> Keywords</th>
                        <th> Common Keywords</th>
                        <th> Missing Keywords</th>
                        <th> Matching Percentage</th>
                    </tr>
                    </tbody>
                    <tbody>
                    <tr>
                        <td> {this.state.theMostSuitableJob} </td>
                        <td> {this.showAllKeyWords(event)} </td>
                        <td> {this.showCommonKeyWords(event)} </td>
                        <td> {this.showMissingKeyWords(event)} </td>
                        <td> {this.state.theMatchingPercentage} </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );


    }

    showAllJobs = () => {
        return (
            <div>
                {this.state.jobDescription.map((job,index) => {
                    return (
                        <div>
                            <li id={"Jobs"}>
                                {job}
                            </li>
                        </div>
                    );
                })
                }
            </div>

        );
    }

    showAllKeyWords = (indexJob) => {
        const keyWords = this.state.jobDetails[indexJob].keywords;
        return (
            <div>
                {keyWords.map((keyWord) => {
                        return (
                            <div>
                                <table className={"keywords"}>
                                    <tr>
                                        <td> {keyWord} </td>
                                    </tr>
                                </table>
                            </div>
                        );

                    }
                )}
            </div>

        );


    }

    getCommonKeyWords = (event) => {
        let commonKeyWords = this.state.jobDetails[event].commonKeywords;
        this.setState({commonKeyWords: commonKeyWords});

    }
    getMissingKeyWords = (event) => {
        let missingKeyWords = this.state.jobDetails[event].missingKeywords;
        this.setState({missingKeyWords: missingKeyWords});
    }

    showCommonKeyWords = (event) => {
        this.getCommonKeyWords(event);
        return (
            <div>
                {this.state.commonKeyWords.map((keyWord) => {
                        return (
                            <div>
                                <table className={"keywords"}>
                                    <tr>
                                        <td> {keyWord} </td>
                                    </tr>
                                </table>
                            </div>
                        );
                    }
                )}
            </div>
        );
    }

    showMissingKeyWords = (event) => {
        this.getMissingKeyWords(event);
        return (
            <div>
                {this.state.missingKeyWords.map((keyWord) => {
                        return (
                            <div>
                                <table className={"keywords"}>
                                    <tr>
                                        <td> {keyWord} </td>
                                    </tr>
                                </table>
                            </div>
                        );
                    }
                )}
            </div>
        );
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Jobs</h1>
                    <div>
                        <div>
                            {this.state.jobDescription.map((job,index) => {
                                return (
                                    <div>
                                        <li id={"Jobs"}>
                                            {job}
                                        </li>
                                        <div>
                                            <button onClick={() => this.buttonViewInformation(index)}>View Information</button>
                                        </div>
                                    </div>
                                );
                            })
                            }
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Menu;