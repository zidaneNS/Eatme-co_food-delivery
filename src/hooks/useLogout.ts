import { useCallback } from "react";
import useAuth from "./useAuth";

const useLogout = () => {
    const { auth, setAuth } = useAuth();
    const logout = useCallback(() => {
        setAuth({ user_name: '', roles: 'guest', errMsg: '' })
    }, [auth])
    return logout
}

export default useLogout;