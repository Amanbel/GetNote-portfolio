import React from "react";
import Cover from "../../assets/photo-cover.jpeg";
import "./home-top-cover-img.styles.scss";


const HomeTopCoverImage = () => {
    return (
        <div className="cover-img">
            <div className="cover-text">
                <h2>GetNote</h2>
                <p>Get instant notes of the subject you want and need,
                    from now on you dont have to worry about writtng
                     extensive notes for anything, you can get them here.</p>
            </div>
            <img src={Cover} alt="cover-image"/>
        </div>
    )
}

export default HomeTopCoverImage;