import React from "react";
import ShareForm from "../../components/share-form/share-form.component";
import "./share.styles.scss"

const Share = () => {
    return (
        <div>
            <ShareForm/>
            <div className="how-to-share">
                <h2>How to share your Document</h2>
                <ul>
                    <li>Upload your Document or Note in the <b>Note Document</b> field</li>
                    <li>Select the type of way that the note was made in, from the <b>Type</b> dropdown</li>
                    <li>Select a Subject from the <b>Subject</b> dropdown, if the subject of the document or note isnt found select <b>others...</b> and type your subject in the appearing field</li>
                    <li>Write a title to be displayed on the <b>Title</b> field</li>
                    <li>Write the situation that the note or document was written for, on the <b>Note written for?</b> field, example: exam, presentaion, quize</li>
                    <li>Write the place you were in when writing the note or document on the <b>Note written from?</b> field example: campus, high school, elementary school and you can also be specific like "4th year of mechanical engineering"</li>
                    <li>Choose the date the note or document was made in, on the <b>Note written date</b> field</li>
                    <li>Choose the monitization status of the note or document in the <b>Monitization status</b> field</li>
                    <li>Write the description of the note in the <b>Description</b> field, the description must be at least 200 words</li>
                </ul>
            </div>
        </div>
    )
}

export default Share;