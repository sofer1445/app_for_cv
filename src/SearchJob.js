import axios from 'axios';
import React from 'react';
import spinner from './giphy.gif';

class SearchJob extends React.Component {
    state = {
        loaded: 0,
        data: [],
        selectedJob: 'Software Engineer',
        jobDetails: [],
        isLoading: false,
    };

    handleJobChange = event => {
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

    formatJobDetails = (jobDetails) => {
        console.log("start format: " + jobDetails);
        return(
            jobDetails.map((jobDetail, index) => (
                <div key={index}>
                    <h1>{jobDetail.jobName}</h1>
                    <h2>Company Name:</h2>
                    <p>{jobDetail.companyName}</p>
                    <h2>Website:</h2>
                    <p>{jobDetail.webSite}</p>
                    <h2>Location:</h2>
                    <p>{jobDetail.location}</p>
                    <h2>Date:</h2>
                    <p>{jobDetail.date}</p>
                    <h2>Job Link:</h2>
                    <p>{"https://www.drushim.co.il/" + jobDetail.jobLink}</p>
                    <h2>Job Detail Text:</h2>
                    <ul>
                        {jobDetail.jobDetailText.map((text, index) => (
                            <li key={index}>{text}</li>
                        ))}
                    </ul>
                </div>
            ))
        )
    }

    render() {
        const jobs = ['Software Engineer', 'Data Scientist', 'Product Manager'];

        return (
            <div>
                <select value={this.state.selectedJob} onChange={this.handleJobChange}>
                    {jobs.map((job, index) => (
                        <option key={index} value={job}>{job}</option>
                    ))}
                </select>
                <button onClick={this.searchJob}>Search</button>
                {this.state.isLoading ? <img className="spinner" src={spinner} alt="Loading..." /> : null}
                {this.state.jobDetails.length > 0 ? this.formatJobDetails(this.state.jobDetails) : null} // not working

            </div>
        );
    }
}

export default SearchJob;