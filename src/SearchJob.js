import axios from 'axios';
import React from 'react';
import spinner from './giphy.gif';

class SearchJob extends React.Component {
    state = {
        loaded: 0,
        data: [],
        selectedJob: '',
        jobDetails: [],
        isLoading: false,
    };

    handleJobChange = event => {
        this.setState({
            selectedJob: event.target.value,
        });
    }
    handleFreeSearchChange = event => {
        this.setState({
            selectedJob: event.target.value,
        });
    }

    searchJob = async () => {
        this.setState({ isLoading: true }); // Set isLoading to true before fetching data
        try {
            //http://localhost:8080/api/search?jobName=Software%20Engineer
            const response = await axios.post('http://localhost:8080/api/search', null, {
                params: {
                    jobName: this.state.selectedJob
                }
            });
            this.setState({ jobDetails: response.data });
        } catch (error) {
            console.error(error);
        }
        this.setState({ isLoading: false }); // Set isLoading to false after fetching data
        this.forceUpdate();
    };

    formatJobDetails = (internetJobs) => {
        return(
            internetJobs.map((jobDetail, index) => (
                jobDetail !== null && (
                    <table key={index} className="job-table">
                        <thead>
                        <tr>
                            <th>Job Name</th>
                            <th>Company Name</th>
                            <th>Website</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Job Link</th>
                            <th>Job Detail Text</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{jobDetail.jobName}</td>
                            <td>{jobDetail.companyName}</td>
                            <td><a href={jobDetail.webSite} target="_blank" rel="noopener noreferrer">{jobDetail.webSite}</a></td>
                            <td>{jobDetail.location}</td>
                            <td>{jobDetail.date}</td>
                            <td><a href={"https://www.drushim.co.il/" + jobDetail.jobLink} target="_blank" rel="noopener noreferrer">Job Link</a></td>
                            <td>
                                <ul>
                                    {jobDetail.jobDetailText.map((text, index) => (
                                        <li key={index}>{text}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                )
            ))
        )
    }

    render() {
        const jobs = ['Software Engineer', 'Automation Engineer', 'DevOps Engineer', 'Frontend Developer', 'Backend Developer', 'Fullstack',
            'Software Tester', 'Web Developer', 'QA Automation', ];
        return (
            <div>
                <h2 className={"TitleSearch"}>Search Job</h2>
                <select className="select-input" value={this.state.selectedJob} onChange={this.handleJobChange}>
                    {jobs.map((job, index) => (
                        <option key={index} value={job}>{job}</option>
                    ))}
                </select>
                <input className="input-text" type="text" placeholder={"free search"} value={this.state.selectedJob} onChange={this.handleFreeSearchChange} />
                <button onClick={this.searchJob} disabled={this.state.selectedJob === ''}>Search</button>
                {this.state.isLoading ? <img className="spinner" src={spinner} alt="Loading..."/> : null}
                {this.state.jobDetails.internetJobs ? this.formatJobDetails(this.state.jobDetails.internetJobs) : null}
            </div>
        );
    }
}

export default SearchJob;