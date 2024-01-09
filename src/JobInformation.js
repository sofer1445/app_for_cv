import React from "react";
import "./styles/JobInformation.css";

function JobInformation({ job, listKeyWords, listCommonKeywords, listMissingKeywords, matchingPercentage }) {
    return (
        <div className="JobInformation-job-information">
            <h1 className="JobInformation-job-title">{job}</h1>
            <div className="JobInformation-job-details">
                <table className="JobInformation-keywords-table">
                    <tbody>
                    {/* **הוספת קווים נפרדים בין רשימות המפתחות** */}
                    <tr>
                        <td className="JobInformation-common-keywords">
                            <h2>Common Keywords</h2>
                            <ul>
                                {listCommonKeywords.map((keyword, index) => (
                                    <li key={index} className="JobInformation-common-keyword">{keyword}</li>
                                ))}
                            </ul>
                        </td>
                        <hr className="JobInformation-keyword-divider" />
                        <td className="JobInformation-missing-keywords">
                            <h2>Missing Keywords</h2>
                            <ul>
                                {listMissingKeywords.map((keyword, index) => (
                                    <li key={index} className="JobInformation-missing-keyword">{keyword}</li>
                                ))}
                            </ul>
                        </td>
                        <hr className="JobInformation-keyword-divider" />
                        <td className="JobInformation-all-keywords">
                            <h2>All Keywords</h2>
                            <ul>
                                {listKeyWords.map((keyword, index) => (
                                    <li key={index} className="JobInformation-all-keyword">{keyword}</li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <p className="JobInformation-matching-percentage">
                    <strong>Matching Percentage:</strong> {matchingPercentage} % matching
                </p>
            </div>
        </div>
    );
}

export default JobInformation;