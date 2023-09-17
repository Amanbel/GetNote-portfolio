import React from "react";
import ImageOne from "../../assets/image1.jpg";
import ImageTwo from "../../assets/image2.jpg";
import ImageThree from "../../assets/image3.jpg";
import './home-info-body.styles.scss'

const HomeInfoBody = () => {
    return (
        <div className="home-info">
            <div className="info-one info">
                <img src={ImageOne} alt="description-image"/>
                <p>GetNote gives you time to actually study better
                     and faster with your freinds or study group,
                     lessen your time of arbitrary note taking and
                      find what you are looking for in GetNote</p>
            </div>
            <div className="info-two info">
                <img src={ImageTwo} alt="description-image"/>
                <p>
                    All those times you have taken to write a note for an exam that lasts
                     for 1 hour and seeing how temporary it was, well dont worry after 
                     those exams you can share all that knowlege to your peers or freinds,
                      here at GetNote 
                </p>
            </div>
            <div className="info-three info">
                <img src={ImageThree} alt="description-image"/>
                <p>
                    GetNote can provide many subjects to which the customer
                     is intrested in some of them are biology,
                     physics, chemistry, civics and the list goes on,
                     accessing all this information gives you time to focuse on what is important 
                </p>
            </div>
        </div>
    )
}

export default HomeInfoBody;