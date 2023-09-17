import React, { useState } from "react";
import "./edit-account.styles.scss"
import axios from "axios";
import { userLogin } from "../../redux/user-reducer/user-actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditAccount = ({currentUser, updateUserState}) => {
    const navigate = useNavigate()
    const [error_code, setError] = useState(0);
    const [filename, setFile] = useState('');
    const [updateInput, setUpdate] = useState(currentUser)

    const handleChange = (e) => {
        const {name, value} = e.target
        setUpdate(prev=>({
            ...prev,
            [name]: value
        }))
    }

    const updateConfirm = (userdata) => {
        alert("Account has been updated successfully")
        updateUserState(userdata)
        navigate("/profile")
        location.reload()
    }

    const handleSubmit = e => {
        e.preventDefault()
        let no_error = true;
        for (let input in updateInput) {
            if (updateInput[input] == "") {
                no_error = false;
            }
        }

        if (no_error && confirm("You are updating your account please confirm?")) {
            axios.post(`http://localhost:8000/api/user-update/${updateInput.id}/`, updateInput).then(res=>{
                console.log(res.data)
                if (res.data.condition){
                    const data = res.data.user;

                    let formData = new FormData();
                    formData.append("profile_img", filename);
                    formData.append('user_fk', updateInput.id)

                    let axiosConfig = {
                        headers: {
                            'Content-Type': 'multpart/form-data'
                        }
                    }
                    if (filename != '') {
                        axios.put(`http://localhost:8000/api/image-upload/images/${updateInput.id}/`, formData, axiosConfig).then(res=>{
                            if (res.data.condition) {
                                updateConfirm(data);
                            }
                        }).catch(error=>{
                            console.log(error)
                        })
                    } else {
                        updateConfirm(data);
                    }
                }
            }).catch(error=>{
                setError(2)
                setTimeout(()=>{
                setError(0)
            }, 4000)
            })
        } else {
            setError(1)
            setTimeout(()=>{
                setError(0)
            }, 4000)
        }
    }
    
    console.log(Object.keys(updateInput))
    return (
        <div className="edit-account">
            <div className="edit-account-container">
                <form onSubmit={handleSubmit}>
                    <div className="img-update">
                        <label htmlFor="up_img">Update profile picture</label>
                        <input id="up_img" type="file" accept="image/*" onChange={e=>{setFile(e.target.files[0])}}/>
                    </div>
                    <label htmlFor="up_username">Username</label>
                    <input id="up_username" type="text" name="username" value={updateInput.username} onChange={handleChange}/>
                    <label htmlFor="up_first_name">First name</label>
                    <input id="up_first_name" type="text" name="first_name" value={updateInput.first_name} onChange={handleChange}/>
                    <label htmlFor="up_last_name">Last name</label>
                    <input id="up_last_name" type="text" name="last_name" value={updateInput.last_name} onChange={handleChange}/>
                    <label htmlFor="up_email">Email</label>
                    <input id="up_email" type="email" name="email" value={updateInput.email} onChange={handleChange}/>
                    <label htmlFor="up_phone">Phone number</label>
                    <input id="up_phone" type="text" name="phone" value={updateInput.phone} onChange={handleChange}/>
                    {error_code == 1 && <p className="error-1">Please fill every field before update</p>}
                    {error_code == 2 && <p className="error-1">Something went wrong white updating</p>}
                    <div className="btn-container">
                        <button className="save-btn">Save</button>
                        <button className="cancel-btn"type="button" onClick={()=>{history.back()}}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    updateUserState: (user) => dispatch(userLogin(user))
})

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);