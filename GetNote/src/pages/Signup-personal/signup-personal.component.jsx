import React from "react"
import CustomFormInput from "../../components/custom-form-input/custom-form-input.component"
import "./signup-personal.styles.scss"
import CustomButton from "../../components/custom-button/custom-button.component"
import { useNavigate } from "react-router-dom"


const SignupPersonal = ({signupInfo, handleChange}) => {
    let navigate = useNavigate()
    return (
        <div className="signup">
            <div className="signup-container">
                <h1 onClick={()=>{navigate("/")}}>GetNote<br/>Signup</h1>
                <form>
                    <CustomFormInput
                        type={"text"}
                        name={"first_name"}
                        handleChange={handleChange}
                        label={"First Name"}
                        value={signupInfo.first_name}
                        />
                    <CustomFormInput
                        type={"text"}
                        name={"last_name"}
                        handleChange={handleChange}
                        label={"Last Name"}
                        value={signupInfo.last_name}
                        />
                    <CustomFormInput
                        type={"text"}
                        name={"phone"}
                        handleChange={handleChange}
                        label={"Phone number"}
                        value={signupInfo.phone}
                        />
                    <select name="status"
                        onChange={handleChange}
                        value={signupInfo.status}
                    >
                        <option value={""}>Status</option>
                        <option value={"high school student"}>High school student</option>
                        <option value={"graduate student"}>Graduate student</option>
                        <option value={"graduate"}>Graduate</option>
                        <option value={"empolyed"}>Employed</option>
                        <option value={"other"}>Other...</option>
                    </select>
                    <CustomButton onclick={()=>{navigate("/signup-account")}}>Next &#10140;</CustomButton>
                    <p>Already have an account? <span onClick={()=>{navigate("/login")}}>Login</span></p>
                </form>
            </div>
        </div>
    )
}

export default SignupPersonal;