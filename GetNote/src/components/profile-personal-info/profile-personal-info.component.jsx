import React from "react"
import "./profile-personal-info.styles.scss"
import { connect } from "react-redux"
import axios from "axios"
import { userLogin } from "../../redux/user-reducer/user-actions"
import { useNavigate } from "react-router-dom"

const ProfilePersonalInfo = ({currentUser, clearUser}) => {
    const navigate = useNavigate()

    const goodBye = () => {
        const conf = confirm("Are you sure you want to delete your account?")
        if (conf) {
            clearUser(null)
            alert("Account deleted successfully")
            navigate("/")
            location.reload()
        }
    }

    const deleteUser = () => {
        axios.delete(`http://localhost:8000/api/user-delete/${currentUser.id}/`).then(res=>{
            goodBye()
        }).catch(error=>{
            console.log("unsuccessful")
        })
    }

    return (
        <div className="profile-personal">
            <div className="profile-personal-container">
                <h4>First name: <span>{currentUser.first_name}</span></h4>
                <h4>Last name: <span>{currentUser.last_name}</span></h4>
                <h4>Phone number: <span>{currentUser.phone}</span></h4>
                <h4>Email: <span>{currentUser.email}</span></h4>
                <button className="change-pass" onClick={()=>{navigate("/change-password", {state:
                    currentUser
                })}}>Change password</button>
                <button className="delete-btn" onClick={deleteUser}>Delete account</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePersonalInfo);