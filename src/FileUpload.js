import React, {useState} from 'react';
import axios from "axios";
import Menu from "./Menu";
import NavLinkStyle from "./NavLinkStyle";
import {BrowserRouter, Routes, Route, NavLink} from "react-router-dom" ;

// לנסות לשנות את התפריט כך שיקבל מידע מהשרת על פי הקובץ שעלה
class FileUpload extends React.Component {
    state = {
        selectedFile: null,
        loaded: 0,
        data: [],
        nameFile: null,
    };

    onChangeHandler = event => {
        this.setState({
            selectedFile: event.target.files,
            loaded: 1,
            nameFile: event.target.files[0].name,
        })

    }


    onClickHandler = () => {
        const data = new FormData()
        for (let x = 0; x < this.state.selectedFile.length; x++) {
            data.append('file', this.state.selectedFile[x])
        }
        axios.post("http://localhost:8080/api/upload", data, {
            // receive two    parameter endpoint url ,form data
        })
            .then(res => { // then print response status
                console.log(res.statusText)
                this.setState({
                    loaded: 2,
                    data: res.data,
                })
            })

    }



    render() {
        return (
            <div className="container">
                {this.state.loaded === 2 ?
                    <div>
                        <p>File uploaded successfully</p>
                        {this.props.fileName(this.state.nameFile)}
                    </div>
                    :
                    <div className="row">
                        <div className="col-md-6">
                            <form method="post" action="#" id="#">
                                <div className="form-group files">
                                    <label>Upload Your File </label>
                                    <input type="file" className="form-control" multiple=""
                                           onChange={this.onChangeHandler}/>
                                </div>
                                <div className="form-group">
                                    <button type="button" className="btn btn-success btn-block"
                                            onClick={this.onClickHandler}>Upload
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default FileUpload;