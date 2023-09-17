import React, { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "./change-password.styles.scss"
import { connect } from "react-redux"
import axios from "axios"
import { userLogin } from "../../redux/user-reducer/user-actions"


const ChangePassword = ({currentUser, updateUser}) => {
    const navigate = useNavigate()
    const [updateInput, setUpdate] = useState(currentUser)
    const [error_code, setError] = useState(0)
    const [passInput, setPass] = useState({
        oldpassword: '',
        confpassword: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target

        setUpdate(prev=>({
            ...prev,
            [name]: value
        }))
    }

    const handleSuccess = () => {
        alert("Your password has been changed successfuly")
        updateUser(updateInput)
        navigate("/profile")
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (currentUser.password == passInput.oldpassword) {
            if (updateInput.password != '' && updateInput.password == passInput.confpassword) {
                axios.post(`http://localhost:8000/api/user-update/${currentUser.id}/`, updateInput).then(res=>{
                    if (res.data.condition) {
                        handleSuccess();
                    } else {
                        setError(1)
                        setTimeout(()=>{
                            setError(0)
                        }, 4000)
                    }
                }).catch(error=>{
                    setError(2)
                    setTimeout(()=>{
                        setError(0)
                    }, 4000)
                })
            } else {
                setError(3)
                setTimeout(()=>{
                    setError(0)
                }, 4000)
            }
        } else {
            setError(4)
            setTimeout(()=>{
                setError(0)
            }, 4000)
        }
    }
    return (
        <div className="change-password">
            <div className="change-password-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="old-pass">Enter Old password</label>
                    <input type="password" name="oldpassword" onChange={(e)=>{
                        setPass(prev=>({
                            ...prev,
                            [e.target.name]: e.target.value
                        }))
                    }} required/>
                    <label htmlFor="new-pass">Enter New password</label>
                    <input id="new-pass" type="password" name="password" onChange={handleChange} required/>
                    <label htmlFor="conf-pass">Confirm New password</label>
                    <input id="conf-pass" type="password" name="confpassword" onChange={(e)=>{
                        setPass(prev=>({
                            ...prev,
                            [e.target.name]: e.target.value
                        }))
                    }} required/>
                    {error_code == 1 && <p className="error-1">Please enter valid password</p>}
                    {error_code == 2 && <p className="error-1">Something went wrong white changing</p>}
                    {error_code == 3 && <p className="error-1">Please confirm your password</p>}
                    {error_code == 4 && <p className="error-1">Old password doesn't match</p>}

                    <div className="btn-cls">
                        <button className="change-btn">Change</button>
                        <button className="cancel-btn" onClick={()=>{navigate("/profile")}}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    updateUser: (userdata) => dispatch(userLogin(userdata))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);