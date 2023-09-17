import React from "react";
import "./profile.styles.scss"
import ProfileUserInfo from "../../components/profile-user-info/profile-user-info.component";
import ProfilePersonalInfo from "../../components/profile-personal-info/profile-personal-info.component.jsx";

const Profile = () => {
    return (
        <div className="profile">
            <ProfileUserInfo/>
            <hr/>
            <ProfilePersonalInfo/>
        </div>
    )
}

export default Profile;