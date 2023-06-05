const userReducer = (states = [], action) => {
    switch(action.type){
        case 'FETCH_USERS':
            return action.payload;
        case 'UPDATE_CURRENT_USER':
            return states.map((state) => state._id === action.payload._id ? action.payload : state)
        case 'UPDATE_USER':
            return states.map((state) => state._id === action.payload._id ? action.payload : state)
        case 'POST_FRIEND':
            return action.payload;
        default:
            return states;
    }
}

export default userReducer;