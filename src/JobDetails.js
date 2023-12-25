import React from 'react';
import { useLocation } from 'react-router-dom';

const JobDetails = () => {
    const location = useLocation();
    const jobDetails = location.state.jobDetails;

    return (
        <div>
            {jobDetails.map((detail, index) => (
                <div key={index}>{detail}</div>
            ))}
        </div>
    );
}

export default JobDetails;