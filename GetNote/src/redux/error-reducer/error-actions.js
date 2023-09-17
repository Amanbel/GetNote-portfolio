export const signupErrorDispatcher = (error) => ({
    type: "SIGNUP_ERROR_CODE",
    payload: error
})

export const loginErrorDispatcher = (error) => ({
    type: "LOGIN_ERROR_CODE",
    payload: error
})