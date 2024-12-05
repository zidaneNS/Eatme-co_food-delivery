import { Dispatch, SetStateAction } from "react";
import { UserType } from "../context/AuthProvider";
import useAuth from "./useAuth";
import axios from "../api/axios";
import { AxiosError } from "axios";

const useLogin = () => {
    const { auth, setAuth } = useAuth();

    const login = async (user_name: string, password: string, setLoading: Dispatch<SetStateAction<boolean>>, setIsAuth: Dispatch<SetStateAction<boolean>>, setSuccess: Dispatch<SetStateAction<boolean>>) => {
        try {
            const response = await axios.post('/auth', JSON.stringify({ user_name, password }));
            console.log('response', response);

            const data: UserType = response.data.data;
            setAuth({ user_name: data.user_name, roles: data.roles, errMsg: data.errMsg });
            setLoading(false);
            setIsAuth(false);
            setSuccess(true);
        } catch (err) {
            const error = err as AxiosError;
            if (error.status === 404) {
                setAuth({ ...auth, errMsg: 'username not found' });
            } else if (error.status === 401) {
                setAuth({ ...auth, errMsg: 'username or password invalid' });
            } else if (error.status === 500) {
                setAuth({ ...auth, errMsg: 'server error' });
            } else {
                setAuth({ ...auth, errMsg: 'Login failed' });
            }
        } finally {
            setLoading(false);
        }
    }

    return login;
}

export default useLogin;