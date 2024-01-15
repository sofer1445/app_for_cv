import React from "react";
import './styles/About.css';

function About () {
    return (
        <div className="about-container">
            <h1 className="about-title">About</h1>
            <p className="about-text">
                Find your dream job with our job matching site. Our advanced algorithms match your resume to job descriptions on the market, helping you stand out from other candidates and increase your chances of getting hired. We also offer a wide range of job search tools, including advanced search and job market analysis.
            </p>
            <p className="about-text">
                Here are some of the benefits of using our site:
            </p>
            <ul className="about-list">
                <li>Accurate matching: Our algorithms use a lot of data to match your resume to job descriptions as accurately as possible.</li>
                <li>Time saving: Our site does the hard work for you and provides you with a list of relevant jobs.</li>
                <li>Improved chances of getting hired: When you submit a resume that is tailored to the job, you improve your chances of getting hired.</li>
            </ul>
            <p className="about-text">
                Try our job matching site today and start your job search journey!
            </p>
        </div>
    );
}
export default About;