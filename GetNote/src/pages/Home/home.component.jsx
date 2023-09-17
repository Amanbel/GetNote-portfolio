import React from "react";
import "./home.styles.scss"
import HomeTopCoverImage from "../../components/home-top-cover-img/home-top-cover-img.component";
import HomeInfoBody from "../../components/home-info-body/home-info-body.component";
import HomeDescriptions from "../../components/home-descriptions/home-descriptions.component";


const Home = () => {
    return (
        <div className="home-container">
            <HomeTopCoverImage/>
            <HomeInfoBody/>
            <HomeDescriptions/>
        </div>
    )
}

export default Home;