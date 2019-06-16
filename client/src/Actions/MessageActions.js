import {FETCH_MESSAGE,POST_MESSAGE,DELETE_MESSAGE} from './types';
import axios from 'axios';

const url = 'http://localhost:3001/API/messages';


/*GET MESSAGES FROM STATE*/
export const recieveMessages = messages => {
    return {
        type: FETCH_MESSAGE,
        messages
    }
}

export const fetchMessages =  () => {
    return async (dispatch) => {
        try {
            const res = await axios.get(`${url}/`)
            const data = await res.data
            return dispatch(recieveMessages(data.messages))
        }
        catch(err) {
            throw err
        }
    }
}

/*POST MESSAGES TO STATE*/
export const createMessage = (data) => {
    return {
        type: POST_MESSAGE,
        payload: {
            id: data.newMsg._id,
            title: data.newMsg.title,
            message: data.newMsg.body,
            author: data.newMsg.author.name
        }
    }
}

export const postMessage = (messageData) => {
    let token = localStorage.getItem('jwt');
    return (dispatch) => {
        return axios.post(`${url}/add`, messageData, {headers: {'Authorization': token}})
        .then(res => {
            dispatch(createMessage(res.data))
        })
        .catch((err) => {
            throw(err)
        })
    }
}

/*DELETE MESSAGES FROM STATE*/
export const delete_succ = (id) => {
    return {
        type: DELETE_MESSAGE, 
        payload: {
            id
        }
    }
}

export const deleteMessage = (id) => {
    return (dispatch) => {
        axios.delete(`${url}/delete/${id}`)
        .then(res => {
            dispatch(delete_succ(res.data)) 
        })
        .catch(err => {
            throw err
        })
    }
}

