const currentState = {
    signup_error_code: 1,
    login_error_code: 1
}


const ErrorReducer = (state = currentState, action) => {
    switch(action.type) {
        case "SIGNUP_ERROR_CODE":
            return {
                ...state,
                signup_error_code: action.payload
            }
        case "LOGIN_ERROR_CODE":
            return {
                ...state,
                login_error_code: action.payload
            }
        default:
            return state;
    }
}

export default ErrorReducer;