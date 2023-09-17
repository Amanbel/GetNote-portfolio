import React from "react";
import NotesList from "../../components/notes-list/notes-list.component";
import "./notes.styles.scss";

const Notes = () => {
    return (
        <div className="notes-page">
            <NotesList/>
        </div>
    )
}

export default Notes;