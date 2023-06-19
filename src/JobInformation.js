import React from "react";

function JobInformation({ job, listKeyWords, listCommonKeywords, listMissingKeywords, matchingPercentage }) {
    return (
        <div className="job-information">
            <h1>Job Information</h1>
            <div className="job-details">
                <h2>Job: {job}</h2>
                <p>
                    <strong>Matching Percentage:</strong> {matchingPercentage} % matching
                </p>
                <p>
                    <strong>List of Common Keywords:</strong>
                </p>
                <ul>
                    {listCommonKeywords.map((keyword, index) => (
                        <li key={index}>{keyword}</li>
                    ))}
                </ul>
                <p>
                    <strong>List of Missing Keywords:</strong>
                </p>
                <ul>
                    {listMissingKeywords.map((keyword, index) => (
                        <li key={index}>{keyword}</li>
                    ))}
                </ul>
                <p>
                    <strong>List of Keywords:</strong>
                </p>
                <ul>
                    {listKeyWords.map((keyword, index) => (
                        <li key={index}>{keyword}</li>
                    ))}
                </ul>

            </div>
        </div>
    );
}

export default JobInformation;