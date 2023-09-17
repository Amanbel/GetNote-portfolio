import React, {useState} from "react";
import CustomFormInput from "../custom-form-input/custom-form-input.component";
import "./share-form.styles.scss"
import { connect } from "react-redux";
import axios from "axios";

const ShareForm = ({currentUser}) => {
    let [inputState, setInput] = React.useState({
        title: "",
        type: "",
        subject: "",
        written_for: "",
        written_from: "",
        written_date: "",
        monetization_status: "",
        author: "",
        description: "",
        posted_date: "",
        note_page: ""
    });
    const [error_code, setError] = useState(0);
    const [filename, setFilename] = React.useState('');

    function handleChange(event) {
        const {name, value} = event.target;
        const date = new Date();
        const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
        const pages = name == "note_page" && !isNaN(Number(value)) ? Number(value) : inputState.note_page;

        setInput(prev=>{
            return {
                ...prev,
                [name]: name != "note_page" ? value : pages,
                posted_date: `${date.getFullYear()}-${month}-${date.getDate()}`,
                author: currentUser.id,
            }
        })

    }
    // console.log(inputState);
    // console.log(filename);

    const handleUpload = () => {

        let no_error = true;

        for (let key in inputState) {
            if (inputState[key] == "") {
                no_error = false;
            }
        }

        if (no_error) {
            axios.post("http://localhost:8000/api/create-note/", inputState).then(res=>{
                // console.log(res.data)
                if (res.data.condition == 1) {

                    if (filename != '') {
                        let formData = new FormData();
                        formData.append("note_file", filename);
                        formData.append("note_fk", res.data.note_id);
        
                        let axiosConfig = {
                            headers: {
                                'Content-Type': 'multpart/form-data'
                            }
                        }
    
                        axios.post("http://localhost:8000/api/file-upload/files/", formData, axiosConfig).then(res=>{
                            // console.log(res);
                            if (res.data.id) {
                                setInput({
                                    title: "",
                                    type: "",
                                    subject: "",
                                    written_for: "",
                                    written_from: "",
                                    written_date: "",
                                    monetization_status: "",
                                    author: "",
                                    description: "",
                                    posted_date: "",
                                    note_page: ""
                                })
                                setFilename('')
                                setError(3)
                                setTimeout(()=>{
                                    setError(0)
                                }, 4000)
                                // alert('Note Successfully Uploaded')
                            } else {
                                setError(2)
                                setTimeout(()=>{
                                    setError(0)
                                }, 4000)
                            }
                        }).catch(error=> {
                            setError(2)
                            setTimeout(()=>{
                                setError(0)
                            }, 4000)
                        })
                    } else {
                        setError(1)
                        setTimeout(()=>{
                            setError(0)
                        }, 4000)
                    }
                } else {
                    setError(1)
                    setTimeout(()=>{
                        setError(0)
                    }, 4000)
                }
            }).catch(error=>{
                setError(2)
                setTimeout(()=>{
                    setError(0)
                }, 4000)
            })
        } else {
            setError(1)
            setTimeout(()=>{
                setError(0)
            }, 4000)
        }

    }
    
    return (
        <div className="share-form">
            <h2>Share Document</h2>
            <div className="share-form-container">
                <div className="first-input-data">
                <div className="doc-cls">
                    <label htmlFor="doc_file"><span>*provide valid document</span>Note Document</label>
                    <input type="file" 
                        id="doc_file" 
                        name="note_document"
                        onChange={e=>setFilename(e.target.files[0])}
                        accept="application/msword, application/vnd.ms-excel, text/plain, application/pdf"/>
                </div>
                <select name="type" onChange={handleChange}>
                    <option value="">Type</option>
                    <option value="handritten">Handwritten</option>
                    <option value="digital">Digital</option>
                </select>
                </div>

                <div className="second-input-data">
                <CustomFormInput 
                    label={"Note topic"} 
                    type={"text"} 
                    handleChange={handleChange} 
                    name={"subject"} 
                    value={inputState.subject}/>
                <CustomFormInput  
                    label={"Title"}
                    type={"text"}
                    handleChange={handleChange}
                    name="title" 
                    value={inputState.title}/>
                <CustomFormInput  
                    label={"Page number"}
                    type={"text"}
                    handleChange={handleChange}
                    name="note_page" 
                    value={inputState.note_page.toString()}/>
                </div>

                <div className="third-input-data">
                <CustomFormInput  
                    label={"Note written for?"}
                    type={"text"}
                    handleChange={handleChange}
                    name="written_for"
                    value={inputState.written_for}/>
                <CustomFormInput  
                    label={"Note written from?"}
                    type={"text"}
                    handleChange={handleChange}
                    name="written_from"
                    value={inputState.written_from}/>
                <div className="date-container">
                    <label htmlFor="note_date">Note Written Date</label>
                    <input
                        type="date"
                        name="written_date"
                        onChange={handleChange}
                        value={inputState.written_date}/>
                </div>
                </div>

                <div className="fourth-input-data">
                <select name="monetization_status" onChange={handleChange} value={inputState.monetization_status}>
                    <option value="">Monetization Status</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                </select>
                <textarea className="desc-input"
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                    value={inputState.description}></textarea>
                {/* {error_code == "unsuccessful" && <h1 className="error">Delete Unsuccessful</h1>} */}
                {error_code == 1 && <p className="error-1">Please fill every field before upload</p>}
                {error_code == 2 && <p className="error-1">Something went wrong white updating</p>}
                {error_code == 3 && <p className="success-1">Your document has been uploaded successfully</p>}
                <button onClick={handleUpload}>Share</button>
                </div>
        </div>
            </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(ShareForm);