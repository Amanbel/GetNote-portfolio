import React, {useEffect, useState} from "react";
import Logo from "../../assets/GetNote_Logo.png"
import CustomButton from "../custom-button/custom-button.component";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { userLogin } from "../../redux/user-reducer/user-actions";
import "./header.styles.scss";
import propic from "../../assets/default-pic.webp"
import axios from "axios";


const Header = ({currentUser}) => {
    const navigate = useNavigate();
    const [pic, setPic] = useState('');

    if (currentUser) {
        useEffect(()=>{
            axios.get(`http://localhost:8000/api/image-upload/images/${currentUser.id}`).then(res=>{
                setPic(res.data.profile_img)
            }).catch(error=>{
                console.log(error)
            })
        }, [])
    }

    return (
        <header>
            <div className="nav-left-side">
                <img src={Logo} alt="image"/>
                <ul>
                    <li onClick={()=>{navigate("/")}}>Home</li>
                    <li onClick={()=>{navigate("/notes")}}>Notes</li>
                    {currentUser ? <li onClick={()=>{navigate("/share")}}>Share</li> : null}
                    <li onClick={()=>{navigate("/about")}}>About Us</li>
                    <li onClick={()=>{navigate("/contact-us")}}>Contact</li>
                </ul>
            </div>
            {currentUser != null ? 
            <div className="nav-right-side-account" onClick={()=>{navigate("/profile")}}>
                <img src={pic} alt="profile picture"/>
                <p>@{currentUser.username}</p>
            </div> : null}
            {currentUser ? null : 
            <div className="nav-right-side">
                <CustomButton onclick={()=>{navigate("/signup-personal")}}>Sign Up</CustomButton>
                <CustomButton  onclick={()=>{navigate("/login")}}>Log In</CustomButton>
            </div>
            }
        </header>
    )
}


const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Header);