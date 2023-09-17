import React from "react";
import ImageOne from "../../assets/student.png";
import ImageTwo from "../../assets/studying1.webp";
import "./home-descriptions.styles.scss";


const HomeDescriptions = () => {
    return (
        <div className="home-descriptions">
            <div className="description-one description">
                <img src={ImageOne} alt="description-img"/>
                <div className="desc-one-text">
                    <h2>Description of GetNote</h2>
                    <p>
                    GetNote is a simple note sharing and accessing platform which gives students,
                    researchers and other people intrested in short written notes a way to note take
                    unnecessery amount of time writting documents or studying subjects which have been
                    written by some one else with the exact predicement, thus giving people time and
                    knowlege
                </p>
                </div>
            </div>
            <div className="description-two description">
                <div className="desc-two-text">
                    <h2>What you can do with GetNote</h2>
                    <p>
                    This platform alows any individual with a specific piece of note or documentation
                    to help them share their knowlege and research easily, by providing a hotspot for 
                    like minded people to communicate through their abilty of note writing, any student
                    or person can find a note that they wanted to write them selfs provided by people,
                    who already have experince in that subject or field, students can now forget about
                    the hastle of note writing before exams and forcuse on studying them.
                </p>
                </div>
                <img src={ImageTwo} alt="description-img"/>
            </div>
        </div>
    )
}

export default HomeDescriptions;