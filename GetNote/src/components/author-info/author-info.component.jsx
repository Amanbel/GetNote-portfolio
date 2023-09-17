import React, { useState } from "react";
import "./author-info.styles.scss";
import { connect } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthorInfo = ({currentUser, note_id, propic, name, status, author, date, for_update}) => {
    const [error_code, setErrorCode] = useState("")
    const navigate = useNavigate()

    const deleteNote = () => {
        if (confirm("Are you sure you want to delete your document?")) {
            axios.delete(`http://localhost:8000/api/note-delete/${note_id}/`).then(res=>{
                if (res.data == "successful") {
                    alert("Delete Successful")
                    navigate("/notes")
                }
            }).catch(error=> {
                setErrorCode("unsuccessful")
                setTimeout(()=>{
                    setErrorCode("")
                }, 5000)
            })
        }
    }
    return (
        <div className="author">
            {error_code == "unsuccessful" && <h1 className="error">Delete Unsuccessful</h1>}
            <div className="author-info">
                <img src={propic} alt="profilepic"/>
                <div className="author-info-text">
                    <h4>{name}</h4>
                    <h3>{status}</h3>
                    <p><b>Date posted: </b> {date}</p>
                </div>
            {currentUser && currentUser.id == author ? <>
                    <button className="update-btn" onClick={()=>{navigate("/edit-note", {state: {
                        for_update
                    }})}}>Update note</button>
                    <button className="delete-btn" onClick={deleteNote}>Delete note</button>
                </>: null}
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(AuthorInfo);