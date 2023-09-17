import React from "react";
import "./login.styles.scss"
import CustomFormInput from "../../components/custom-form-input/custom-form-input.component";
import CustomButton from "../../components/custom-button/custom-button.component";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { loginErrorDispatcher } from "../../redux/error-reducer/error-actions";
import { userLogin } from "../../redux/user-reducer/user-actions";
import axios from "axios";


const Login = ({setErrorCode, login_error_code, setUser}) => {
    const [loginInfo, setLogin] = React.useState({
        email: "",
        password: ""
    })
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        if (loginInfo.email != "" && loginInfo.password != "") {
            axios.get(`http://localhost:8000/api/user-login/${loginInfo.email}/${loginInfo.password}/`).then(res=>{
            setErrorCode(res.data.condition)
            setTimeout(()=>{
                setErrorCode(1)
            }, 4000)
            if (res.data.condition == 1) {
                setUser(res.data.user);
                navigate("/");
            }
        }).catch(error=>{
            setErrorCode(3)
            setTimeout(()=>{
                setErrorCode(1)
            }, 4000)
        })
        } else {
            setErrorCode(2)
            setTimeout(()=>{
                setErrorCode(1)
            }, 4000)
        }
    }

    return (
        <div className="login">
            <div className="login-container">
                <h1 onClick={()=>{navigate("/")}}>GetNote<br/>Login</h1>
                <form onSubmit={handleSubmit}>
                    <CustomFormInput
                        type={"email"}
                        label={"Email"}
                        handleChange={(event)=>setLogin(prev=>({
                            ...prev,
                            [event.target.name]: event.target.value
                        }))}
                        name={"email"}
                        value={loginInfo.email}/>
                    <CustomFormInput
                        type={"password"}
                        label={"Password"}
                        handleChange={(event)=>setLogin(prev=>({
                            ...prev,
                            [event.target.name]: event.target.value
                        }))}
                        name={"password"}
                        value={loginInfo.password}/>
                    {login_error_code == 0 && <p className="error-1">Incorrect Email or Password</p>}
                    {login_error_code == 2 && <p className="error-1">Please fill every form before login</p>}
                    {login_error_code == 3 && <p className="error-1">Something went wrong</p>}
                    <CustomButton>Login</CustomButton>
                    <p>Don't have an account? <span onClick={()=>{navigate("/signup-personal")}}>Signup</span></p>
                </form>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    setErrorCode: (error) => dispatch(loginErrorDispatcher(error)),
    setUser: (userdata) => dispatch(userLogin(userdata))
});

const mapStateToProps = state => ({
    login_error_code: state.error.login_error_code
})
export default connect(mapStateToProps, mapDispatchToProps)(Login);