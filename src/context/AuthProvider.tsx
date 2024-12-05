import { createContext, useState, ReactElement, Dispatch, SetStateAction } from "react";

export type RolesType = 'admin' | 'user' | 'guest';

export type UserType = {
    user_name: string | null,
    roles: RolesType,
    errMsg: string
}

const initState: UserType = {
    user_name: null,
    roles: 'guest',
    errMsg: ''
}

export type UseAuthContextType = {
    auth: UserType,
    setAuth: Dispatch<SetStateAction<UserType>>
}

const initContextState: UseAuthContextType = { auth: { user_name: null, roles: 'guest', errMsg: '' }, setAuth: () => {} }

const AuthContext = createContext<UseAuthContextType>(initContextState);

export type ChildrenType = {
    children: ReactElement | ReactElement[]
}

export const AuthProvider = ({ children }: ChildrenType): ReactElement => {
    const [auth, setAuth] = useState<UserType>(initState);
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;