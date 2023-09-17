import React, { useState } from "react"
import CustomFormInput from "../../components/custom-form-input/custom-form-input.component"
import "./signup-account.styles.scss"
import CustomButton from "../../components/custom-button/custom-button.component"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import propic from "../../assets/default-pic.webp"


const SignupAccount = ({setSignUp, signupInfo, handleChange}) => {
    let navigate = useNavigate();
    const [confirm, setConfirm] = React.useState({
        confirm_pass: ""
    });
    const [picture, setPicture] = useState('');
    const [error_code, setError] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        const {
            first_name,
            last_name,
            phone,
            email,
            password,
            username, status} = signupInfo;
        

        // console.log({...signupInfo, ...formData})
        if (typeof(first_name) == "string" && typeof(last_name) == "string"
        && !isNaN(Number(phone)) && status != "" && email != "" && password != "" && username != ""){
            if (password == confirm.confirm_pass) {
                axios.post("http://localhost:8000/api/create-user/", signupInfo).then(res=>{
                    console.log(res.data);
                    if (res.data.condition == 1) {
                        let formData = new FormData()
                        formData.append("profile_img", picture)
                        formData.append("user_fk", res.data.user_id)
                        
                        let axiosConfig = {
                            headers: {
                                'Content-Type': 'multpart/form-data'
                            }
                        }
                        axios.post("http://localhost:8000/api/image-upload/images/", formData, axiosConfig).then(res=>{
                            setSignUp({
                            username: "",
                            email: "",
                            password: "",
                            first_name: "",
                            last_name: "",
                            phone: "",
                            status: ""
                        })
                        navigate("/login");
                        }).catch(error=>{
                            setError(3)
                            setTimeout(()=>{
                                setError(0)
                            }, 4000)
                        })
                    } else {
                        setError(2)
                        setTimeout(()=>{
                            setError(0)
                        }, 4000)
                    }
                }).catch(error=>{
                    setError(3)
                    setTimeout(()=>{
                        setError(0)
                    }, 4000)
                })
            }
        } else {
            setError(1)
            setTimeout(()=>{
                setError(0)
            }, 4000)
        }
    }

    return (
        <div className="signup">
            <div className="signup-container">
                <h1 onClick={()=>{navigate("/")}}>GetNote<br/>Signup</h1>
                <form onSubmit={handleSubmit}>
                    <div className="upload-picture">
                        <label htmlFor="img_file">Upload profile picture</label>
                        <input type="file" id="img_file" onChange={e=>setPicture(e.target.files[0])} accept="image/*"/>
                     </div>
                    <CustomFormInput
                        type={"text"}
                        name={"username"}
                        handleChange={handleChange}
                        label={"Username"}
                        value={signupInfo.username}
                        />
                    <CustomFormInput
                        type={"email"}
                        name={"email"}
                        handleChange={handleChange}
                        label={"Email"}
                        value={signupInfo.email}
                        />
                    <CustomFormInput
                        type={"password"}
                        name={"password"}
                        handleChange={handleChange}
                        label={"Password"}
                        value={signupInfo.password}
                        />
                    <CustomFormInput
                        type={"password"}
                        name={"confirm_pass"}
                        handleChange={(event)=>setConfirm(prev=>({
                            ...prev,
                            [event.target.name]: event.target.value
                        }))}
                        label={"Confirm password"}
                        value={confirm.confirm_pass}
                        />
                    {error_code == 1 && <p className="error-1">Please fill every form before sign up</p>}
                    {error_code == 2 && <p className="error-1">Please check if every inputed data is valid</p>}
                    {error_code == 3 && <p className="error-1">Something went wrong</p>}
                    <CustomButton type="submit">Signup</CustomButton>
                    <button className="back-btn" onClick={()=>{navigate("/signup-personal")}}>Back</button>
                    <p>Already have an account? <span onClick={()=>{navigate("/login")}}>Login</span></p>
                </form>
            </div>
        </div>
    )
}

export default SignupAccount;