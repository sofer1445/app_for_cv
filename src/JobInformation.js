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
                <div className="keywords">
                    <div className="common-keywords">
                        <h3>Common Keywords</h3>
                        <ul>
                            {listCommonKeywords.map((keyword, index) => (
                                <li key={index}>{keyword}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="missing-keywords">
                        <h3>Missing Keywords</h3>
                        <ul>
                            {listMissingKeywords.map((keyword, index) => (
                                <li key={index}>{keyword}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="all-keywords">
                        <h3>All Keywords</h3>
                        <ul>
                            {listKeyWords.map((keyword, index) => (
                                <li key={index}>{keyword}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JobInformation;