import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from "../constants/types"
import axios from "../helpers/axios"


export const login = (user) => {

    return (dispatch) => {

        dispatch({ type: LOGIN_REQUEST });

        axios.post('/login', {
            ...user
        }).then((res) => {

            if (res.status === 200) {

                const { token, user } = res.data;
                
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user))
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {
                        token, user
                    }
                })
            }

        }).catch((err) => {
            console.log(err.response.data)
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: { error: err.response.data.error }
                })
            }
        )
    };
}

export const isUserLoggedIn = () => {

    return dispatch => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        } else {
            dispatch({
                type: LOGIN_FAILURE,
                payload: { error: 'Failed to login' }
            })
        }
    }

}
