import React, {useEffect, useState}from "react"
import { useLocation } from "react-router-dom"
import NotePreview from "../../components/note-preview/note-preview.component"
import "./note-detail.styles.scss"
import axios from "axios"
import AuthorInfo from "../../components/author-info/author-info.component"


const NoteDetail = () => {
    const location = useLocation();
    const [pic, setPic] = useState('');
    const {
        name,
        note_id,
        status,
        author,
        date,
        title,
        for_details,
        description
    } = location.state;

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/image-upload/images/${author}`).then(res=>{
            setPic(res.data.profile_img)
        }).catch(error=>{
            console.log(error)
        })
    }, [])

    return (
        <div className="note-detail">
            <div className="note-detail-container">
                <AuthorInfo
                    note_id={note_id}
                    propic={pic}
                    author={author}
                    name={name}
                    status={status}
                    date={date}
                    for_update={for_details}
                    />
                    <hr/>
                    <h1>{title}</h1>
                    <hr/>
                <div className="author-note-description">
                    <h3>Description</h3>
                    <div className="note-desc">
                        <p>
                            {description}
                        </p>
                    </div>
                </div>
                <NotePreview
                    for_details={for_details}/>
            </div>
        </div>
    )
}

export default NoteDetail;