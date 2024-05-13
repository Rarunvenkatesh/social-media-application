const AuthReducer = (state,dispatch)=>{
    switch(dispatch.type){
        case "LOGIN_START":
    return{
            user : null,
            isFetching: true,
            error: false,
        };
        case "LOGIN_SUCCESS":
            return{
                    user : dispatch.payload,
                    isFetching: false,
                    error: false,
                };
                case "LOGIN_FAILURE":
                    return{
                            user : null,
                            isFetching: false,
                            error: dispatch.payload,
                        };
                        case "FOLLOW":
                            return {
                                ...state,
                                user: {
                                    ...state.user,
                                    followings:[...state.user.followings, dispatch.payload],
                                },
                            };
                            case "UNFOLLOW":
                                return {
                                  ...state,
                                  user: {
                                    ...state.user,
                                    followings: state.user.followings.filter(
                                      (following) => following !== dispatch.payload
                                    ),
                                  },
                                };
                                case "LOGOUT":
                                    return {
                                        user:null,
                                        isFetching: false,
                                        error: false
                                    };
                        default:
                            return state;
    }    
};

export default AuthReducer;