const friendReducer = (state=null, action) => {
    switch (action.type){
        case 'FETCH_FRIEND':
                return action.payload;
        default:
            return state;
    }
}

export default friendReducer;