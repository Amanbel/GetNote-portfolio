import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./note-post-item.styles.scss"
import axios from "axios";


const NotePostItem = ({note_id, author, title, date, description, for_details}) => {
    const navigate = useNavigate();
    const [userData, setUserdata] = useState({
        name: "",
        status: ""
    });
    const [pic, setPic] = useState('');
    

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/user-data/${author}/`).then(res=>{
            setUserdata(res.data)
        })
        axios.get(`http://localhost:8000/api/image-upload/images/${author}`).then(res=>{
            setPic(res.data.profile_img)
        }).catch(error=>{
            console.log(error)
        })
    }, [])

    return (
        <div className="note-item" onClick={()=>navigate("/notes/detail",
            {state:{
                name: [userData.name],
                status: [userData.status],
                note_id,
                author,
                title,
                date,
                for_details,
                description}})}>
            <img src={pic} alt="profile"/>
            <div className="post-info">
                <h3>{userData.name} <span>{userData.status}</span><hr/></h3>
                <h4>{title}</h4>
                <p className="date"><b>Date posted:</b> <span>{date}</span></p>
                <b className="desc-header">Description</b>
                <p className="desc-body">{description}</p>
            </div>
        </div>
    )
}

export default NotePostItem;