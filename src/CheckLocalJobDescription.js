import React, { useState } from "react";
import axios from 'axios';

class CheckLocalJobDescription extends React.Component {
    state = {
        jobDescription: '',
        sumOfCommonKeyWords: [],
        showResults: false,
    };

    handleInputChange = (event) => {
        this.setState({ jobDescription: event.target.value });
    }

    checkDes = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/compatibilityTest', {
                jobDetailText: this.state.jobDescription,
            });
            this.setState({sumOfCommonKeyWords: response.data, showResults: true});
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        let percentage = ((this.state.sumOfCommonKeyWords[1] / (this.state.sumOfCommonKeyWords[0] + this.state.sumOfCommonKeyWords[1])) * 100).toFixed(2);
        let green = Math.min(255, Math.max(0, Math.round((percentage - 20) * 5.1)));
        let color = `rgb(0, ${green}, 0)`;
        return (
            <div>
                <textarea value={this.state.jobDescription} onChange={this.handleInputChange} />
                <button onClick={this.checkDes}>Check Job Description</button>
                {this.state.showResults ? (
                    <div>
                        <h2>Results:</h2>
                        <p className={"pOfTheRight"}>Resume: {this.props.cvFileName}</p>
                        <table>
                            <tbody>
                            <tr>
                                <td>
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
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ) : null}
            </div>
        );
    }
}
export default CheckLocalJobDescription;