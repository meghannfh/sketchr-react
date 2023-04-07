import { useAuthContext } from './useAuthContext';

export const useLogoutContext = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user');

        //dispatch logout action
        //there's no payload in this case
        //it just set sthe user to null
        dispatch({ type: 'LOGOUT' })
    }

    return { logout }
}