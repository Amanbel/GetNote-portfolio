import React, {useEffect, useState}from "react";
import "./profile-user-info.styles.scss"
import propic from "../../assets/default-pic.webp"
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../redux/user-reducer/user-actions";
import axios from "axios";

const ProfileUserInfo = ({currentUser, clearUser}) => {
    const navigate = useNavigate()
    const [pic, setPic] = useState('');

    const headOut = () => {
        if (confirm("Are you sure you want to sign out?")) {
            clearUser(null)
            navigate("/")
            location.reload()
        }
    }

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/image-upload/images/${currentUser.id}`).then(res=>{
            setPic(res.data.profile_img)
        }).catch(error=>{
            console.log(error)
        })
    }, [])

    return (
        <div className="profile-user-info">
            <div className="profile-user-info-container">
                <div>
                    <img src={pic} alt="profile-picture"/>
                </div>
                <div className="user-info">
                    <h4 className="username">@{currentUser.username}</h4>
                    <h4 className="user-status">{currentUser.status}</h4>
                </div>
                <div className="user-btns">
                    <button className="edit-btn" onClick={()=>{navigate("/edit-account")}}>Edit</button>
                    <button className="signout-btn" onClick={headOut}>Sign Out</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    clearUser: (userdata) => dispatch(userLogin(userdata))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUserInfo);