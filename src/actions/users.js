import * as api from '../api'

export const fetchAllUsers = () => async (dispatch) => {
    try {
        const {data} = await api.fetchAllUsers()
        dispatch({type :"FETCH_USERS", payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = (id, updateData) => async (dispatch) => {
    try {
        const {data} = await api.updateProfile(id, updateData)
        dispatch({type: "UPDATE_CURRENT_USER", payload: data})
    } catch (error) {
        console.log(error, "updateProfile")
    }
}

export const updateUser = (id,updateData) => async(dispatch) => {
    try{
        const {data} = await api.updateUser(id,updateData)
        console.log('complete')
        dispatch({type: "UPDATE_USER", payload:data})
    } catch(error){
        console.log(error,"updateUser")
    }
}