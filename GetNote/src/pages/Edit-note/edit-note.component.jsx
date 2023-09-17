import React, { useState } from "react";
import "./edit-note.styles.scss"
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const EditNote = ({updateUserState}) => {
    const location = useLocation()
    const {for_update} = location.state
    const navigate = useNavigate()
    const [error_code, setError] = useState(0);
    const [filename, setFile] = useState('');
    const [updateInput, setUpdate] = useState(for_update)

    const handleChange = (e) => {
        const {name, value} = e.target
        const pages = name == "note_page" && !isNaN(Number(value)) ? Number(value) : updateInput.note_page;

        setUpdate(prev=>({
            ...prev,
            [name]: name == "note_page" ? pages : value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        let no_error = true;
        for (let input in updateInput) {
            if (updateInput[input] == '') {
                no_error = false;
            }
        }

        if (no_error && confirm("You are updating your document please confirm?")) {
            axios.post(`http://localhost:8000/api/note-update/${updateInput.id}/`, updateInput).then(res=>{
                if (res.data.condition){

                    let formData = new FormData();
                    formData.append("note_file", filename);
                    formData.append('note_fk', updateInput.id)

                    let axiosConfig = {
                        headers: {
                            'Content-Type': 'multpart/form-data'
                        }
                    }
                    if (filename != '') {
                        axios.put(`http://localhost:8000/api/file-upload/files/${updateInput.id}/`, formData, axiosConfig).then(res=>{
                            if (res.data.condition) {
                                navigate("/notes")
                            }
                        }).catch(error=>{
                            console.log(error)
                        })
                    } else {
                        navigate("/notes")
                    }
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
        <div className="edit-account">
            <div className="edit-account-container">
                <form onSubmit={handleSubmit}>
                    <div className="doc-update">
                        <label htmlFor="up_doc">Change document</label>
                        <input id="up_doc"
                            type="file"
                            onChange={e=>{setFile(e.target.files[0])}}
                            accept="application/msword, application/vnd.ms-excel, text/plain, application/pdf"/>
                    </div>
                    <label htmlFor="up_title">Title</label>
                    <input id="up_title" type="text" name="title" value={updateInput.title} onChange={handleChange}/>
                    <label htmlFor="up_topic">Note topic</label>
                    <input id="up_topic" type="text" name="subject" value={updateInput.subject} onChange={handleChange}/>
                    <label htmlFor="up_w_for">Written for</label>
                    <input id="up_w_for" type="text" name="written_for" value={updateInput.written_for} onChange={handleChange}/>
                    <label htmlFor="up_w_from">Written from</label>
                    <input id="up_w_from" type="text" name="written_from" value={updateInput.written_from} onChange={handleChange}/>
                    <label htmlFor="up_page">Page number</label>
                    <input id="up_page" type="text" name="note_page" value={updateInput.note_page} onChange={handleChange}/>
                    <select name="type" className="type-cls" value={updateInput.type} onChange={handleChange}>
                        <option value="">Type</option>
                        <option value="handwritten">Handwritten</option>
                        <option value="digital">Digital</option>
                    </select>
                    <select name="monetization_status" className="moneti-cls" value={updateInput.monetization_status} onChange={handleChange}>
                        <option value="">Monetization status</option>
                        <option value="free">Free</option>
                        <option value="paid">Paid</option>
                    </select>
                    {error_code == 1 && <p className="error-1">Please fill every field before update</p>}
                    {error_code == 2 && <p className="error-1">Something went wrong white updating</p>}
                    <div className="btn-container">
                        <button className="save-btn">Save</button>
                        <button className="cancel-btn"type="button" onClick={()=>{history.back()}}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditNote;