import React, {useState} from 'react';
import axios from "axios";



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
            if (this.state.selectedFile[x].type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                alert("Only .docx files are allowed!");
                return;
            }
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
                this.props.fileName(this.state.nameFile);
            })
    }



    render() {
        return (
            <div className="container">
                {this.state.loaded === 2 ?
                    <div>
                        <p>File uploaded successfully</p>
                        {this.state.nameFile !== null ?
                            <p>File name: {this.state.nameFile}</p>
                            :
                            null
                        }
                    </div>
                    :
                    <div className="row">
                        <div className="col-md-6">
                            <form method="post" action="#" id="#">
                                <div className="form-group files">
                                    <label className={"labelText"}>Upload Your File </label>
                                    <input type="file" className="form-control" multiple=""
                                           onChange={this.onChangeHandler}/>
                                </div>
                                <div className="form-group">
                                    <button type="button" className="btn btn-success btn-block" disabled={!this.state.loaded}
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