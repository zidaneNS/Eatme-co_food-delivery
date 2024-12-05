import { Dispatch, SetStateAction } from "react";
import { RolesType } from "../context/AuthProvider";
import useAuth from "./useAuth";
import axios from "../api/axios";
import { AxiosError } from "axios";

const useRegister = () => {
    const { auth, setAuth } = useAuth();

    const register = async (user_name: string, password: string, setIsSignUp: Dispatch<SetStateAction<boolean>>, setLoading: Dispatch<SetStateAction<boolean>>, setSuccess: Dispatch<SetStateAction<boolean>>) => {
        try {
            const roles: RolesType = 'user';
            const response = await axios.post('/register', JSON.stringify({ user_name, password, roles }));

            console.log('response', response);
            setIsSignUp(false);
            setSuccess(true);
        } catch (err) {
            console.error(err);
            const error: AxiosError = err as AxiosError;

            if (error.status === 400) {
                setAuth({ ...auth, errMsg: 'input field cannout empty' });
            } else if (error.status === 500) {
                setAuth({ ...auth, errMsg: 'server error' });
            } else if (error.status === 409) {
                setAuth({ ...auth, errMsg: 'username already exists' });
            } else {
                setAuth({ ...auth, errMsg: 'register error' });
            }
        } finally {
            setLoading(false)
        }
    }

    return register
}

export default useRegister