import React from "react";
import "./styles/PopulerWords.css";


class PopularWords extends React.Component {
    state = {
        showPopularWords: false,
        popularWords: [],
    };

    constructor(props) {
        super(props);
        this.popularWords = [];
    }

    getPopularWords = () => {
        console.log("getPopularWords");
        const popularWords = this.checkPopularWords();
        this.setState({
            popularWords: popularWords,
            showPopularWords: true,
        });
    };

    checkPopularWords = () => {
        debugger;
        console.log("checkPopularWords");

        let unpopularWords = this.props.jobDetails[0].keywords;
        let popularWords = [];
        let keyWords = [];
        for (let i = 1; i < this.props.jobDetails.length; i++) {
            keyWords = this.props.jobDetails[i].keywords;
            console.log("jobName: " + this.props.jobDetails[i].jobName);
            for (let j = 0; j < keyWords.length; j++) {
                if (unpopularWords.includes(keyWords[j])) {
                    unpopularWords = unpopularWords.filter((word) => word !== keyWords[j]);
                    popularWords.push(keyWords[j]);
                }
            }

        }
        return popularWords;


    };

    checkEmptyArrayPopularWords = () => {
        console.log("checkEmptyArrayPopularWords");
        if (this.state.popularWords.length === 0) {
            return true;
        }
        return false;
    }

    renderPopularWords = () => {
        console.log("renderPopularWords");
        return (
            <div className={"PopularWords-popular-words"}>
                <h1 id={"PopularWords-TitlePop"}>Popular Words ({this.state.popularWords.length}) </h1>
                <ul className={"PopularWords-popWord"}>
                    {this.state.popularWords.map((keyword, index) => (
                        <li key={index}>{keyword}</li>
                    ))}
                </ul>

            </div>
        );
    };

    render() {
        console.log("render");
        return (
            <div className={"PopularWords-popular-words"}>
                <button onClick={this.getPopularWords}>Popular Keywords </button>
                {this.state.showPopularWords ? this.renderPopularWords() : null}
            </div>
        );
    }
}
export default PopularWords;