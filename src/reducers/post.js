const postReducer = (state = {data: null}, action) => {
    switch(action.type){
        case "POST_SOCIAL":
            return action.payload;
        case "FETCH_POST":
            return state.map((state) => state._id === action.payload._id ? action.payload : state)
        case "POST_ANSWER":
            return {...state}
        default:
            return state;
    }
}

export default postReducer;