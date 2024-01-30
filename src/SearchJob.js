import axios from 'axios';
import React from 'react';
import spinner from './styles/pictures/giphy.gif';
import {select} from "async";
import "./styles/SearchJob.css";


class SearchJob extends React.Component {
    state = {
        loaded: 0,
        data: [],
        selectedJob: this.props.selectedJob,
        jobDetails: [],
        isLoading: false,
        sumOfCommonKeyWords: [],
        clickedJobIndex: -1,

    };

    handleJobChange = event => {
        this.setState({
            selectedJob: event.target.value,
        });
    }
    _handleFreeSearchChange = event => {
        this.setState({
            selectedJob: event.target.value,
        });
    }

    // handleFileUpload = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         this.setState({
    //             selectedFile: file,
    //             loaded: 1,
    //         })
    //     }
    // }

    searchJob = async () => {
        this.setState({isLoading: true}); // Set isLoading to true before fetching data
        try {
            const response = await axios.post('http://localhost:8080/api/search', null, {
                params: {
                    jobName: this.state.selectedJob
                }
            });
            this.setState({jobDetails: response.data});
        } catch (error) {
            console.error(error);
            // refresh the page
            // window.location.reload(false);
            const response = await axios.post('http://localhost:8080/api/takeFromDB', null, {
                params: {
                    jobName: this.state.selectedJob
                }
            });
            this.setState({jobDetails: response.data});
            }
        this.setState({isLoading: false}); // Set isLoading to false after fetching data
        this.forceUpdate();
    };

    jobSuitability = async (index) => {
        try {
            const response = await axios.post('http://localhost:8080/api/compatibilityTest', {
                jobDetailText: this.state.jobDetails.internetJobs[index].jobDetailText,
            });
            // this.setState({ sumOfCommonKeyWords: response.data });
            this.setState({sumOfCommonKeyWords: response.data});

        } catch (error) {
            console.log(error);
        }
        this.setState({buttonSumOfCommonKeyWords: false});
        this.setState({ clickedJobIndex: index });
    }


    formatJobDetails = (internetJobs) => {
        if (!internetJobs) {
            return null;
        }
        let percentage = ((this.state.sumOfCommonKeyWords[1] / (this.state.sumOfCommonKeyWords[0] + this.state.sumOfCommonKeyWords[1])) * 100).toFixed(2);
        let green = Math.min(255, Math.max(0, Math.round((percentage - 20) * 5.1)));
        let color = `rgb(0, ${green}, 0)`;
        return (
            internetJobs.map((jobDetail, index) => (
                jobDetail !== null && (
                    <table key={index} className="SearchJob-job-table">
                        <thead>
                        <tr>
                            <th className={"SearchJob-th-jobDetail"}>Job Name</th>
                            <th className={"SearchJob-th-jobDetail"}>Company Name</th>
                            <th className={"SearchJob-th-jobDetail"}>Website</th>
                            <th className={"SearchJob-th-jobDetail"}>Location</th>
                            <th className={"SearchJob-th-jobDetail"}>Date</th>
                            <th className={"SearchJob-th-jobDetail"}>Job Link</th>
                            <th className={"SearchJob-th-jobDetail"}>Job Detail Text</th>
                            <th className={"SearchJob-th-jobDetail"}>Overlapping keywords</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{jobDetail.jobName}</td>
                            <td>{jobDetail.companyName}</td>
                            <td><a href={jobDetail.webSite} target="_blank" rel="noopener noreferrer">Company
                                Website</a>
                            </td>
                            <td>{jobDetail.location}</td>
                            <td>{jobDetail.date}</td>
                            <td><a href={"https://www.drushim.co.il/" + jobDetail.jobLink} target="_blank"
                                   rel="noopener noreferrer">Job Link</a></td>
                            <td>
                                <ul style={{maxHeight: '250px', overflowY: 'scroll'}}>
                                    <button onClick={() => this.jobSuitability(index)}
                                            disabled={this.state.buttonSumOfCommonKeyWords}>Job Suitability
                                    </button>
                                    {jobDetail.jobDetailText.map((text, index) => (
                                        <li key={index}>{text}</li>
                                    ))}
                                </ul>
                            </td>
                            {this.state.sumOfCommonKeyWords.length !== 0 && index === this.state.clickedJobIndex && (
                                <td className={"SearchJob-tdShowSum"}>
                        <span style={{color: 'red'}}>
                            {this.state.sumOfCommonKeyWords[0] + " Missing key words, "}
                        </span>
                                    <span style={{color: 'green'}}>
                            {this.state.sumOfCommonKeyWords[1] + " Common key words. "}
                        </span>
                                    <div style={{width: '100%', backgroundColor: '#f3f3f3'}}>
                                        <div style={{
                                            width: `${percentage}%`,
                                            backgroundColor: color,
                                            height: '20px'
                                        }}/>
                                    </div>
                                    {percentage + "% matching"}
                                </td>
                            )}
                        </tr>
                        </tbody>
                    </table>
                )
            ))
        )
    }


    render() {
        const jobs = ['Software Engineer', 'Automation Engineer', 'DevOps Engineer', 'Frontend Developer', 'Backend Developer', 'Fullstack',
            'Software Tester', 'Web Developer', 'QA Automation',];
        const cvFileName = this.props.cvFileName;
        return (
            <div>
                <h2 className={"SearchJob-TitleSearch"}>Search Job</h2>
                <h3 className={"SearchJob-input-text"}>Resume: {
                    // if cvfile is empty, show "No file chosen", else show the file name
                    cvFileName === null ? 'According to previous CVs' : cvFileName
                }</h3>
                <select className="SearchJob-select-input" value={this.state.selectedJob} onChange={this.handleJobChange}>
                    <option value="">Select Job</option>
                    {jobs.map((job, index) => (
                        <option key={index} value={job}>{job}</option>
                    ))}
                </select>
                <input className="SearchJob-input-text" type="text" placeholder={"free search"} value={this.state.selectedJob}
                       onChange={this._handleFreeSearchChange}/>
                <button onClick={this.searchJob} disabled={this.state.selectedJob === ''}>Search</button>
                {this.state.isLoading ? <img className="SearchJob-spinner" src={spinner} alt="Loading..."/> : null}
                {this.state.jobDetails.internetJobs ? this.formatJobDetails(this.state.jobDetails.internetJobs) : null}

            </div>
        );
    }
}

export default SearchJob;
