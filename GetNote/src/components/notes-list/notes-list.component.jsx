import React, { useEffect, useState } from "react";
import NotePostItem from "../note-post-item/note-post-item.component";
import "./notes-list.styles.scss"
import axios from "axios";
import CustomButton from "../custom-button/custom-button.component";
// import CustomButton


const NotesList = () => {
    const [files, setFiles] = useState([]);
    const [searchInput, setSearch] = useState({
        type: "",
        subject: ""
    })

    useEffect(()=>{
        axios.get("http://localhost:8000/api/notes-list/").then(res=>{
            setFiles(res.data)
        })
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target
        setSearch(prev=>({
            ...prev,
            [name]: value
        }))
    }

    const handelSearch = () => {
        if (searchInput.type != '' && searchInput.subject != '') {
            axios.get(`http://localhost:8000/api/search-note/${searchInput.type}/${searchInput.subject}`).then(res=>{
                setFiles(res.data.searched)
            }).catch(error=>{
                console.log(error)
            })
        }
    }

    return (
        <div className="notes-list">
            <form>
                <div className="filters">
                    <select name="type" onChange={handleChange}>
                    <option value="">Type</option>
                    <option value="handwritten">Handwritten</option>
                    <option value="digital">Digital</option>
                </select>
                <label htmlFor="sub-filter">Topic</label>
                <input type="text" id="sub-filter" name="subject" onChange={handleChange} value={searchInput.subject}/>
                <CustomButton onclick={handelSearch} style={{
                    marginLeft: "20px",
                    width: "80px"
                }} type="button">filter</CustomButton>
                </div>
            </form>
            <div className="notes-list-container">
            {files && files.map(item=><NotePostItem
                note_id = {item.id}
                title={item.title}
                description={item.description}
                author={item.author}
                authorStatus={item.author.status}
                date={item.posted_date}
                for_details={item}
                key={item.id}
            />)}
        </div>
        </div>
    )
}

export default NotesList;