const currentState = {
    currentUser: null
}

const UserReducer = (state = currentState, action) => {
    switch (action.type){
        case "USER_LOGIN_DATA":
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default UserReducer;