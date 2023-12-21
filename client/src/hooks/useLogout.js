// import { useAuthContext } from './useAuthContext';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/authSlice';


export const useLogout = () => {
    const dispatch = useDispatch();

    const logoutUser = () => {
        //remove user from storage
        localStorage.removeItem('user');

        //dispatch logout action
        //there's no payload in this case
        //it just set sthe user to null
        dispatch(logout())
    }

    return { logoutUser }
}