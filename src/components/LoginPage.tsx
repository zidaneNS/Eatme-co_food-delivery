import { SetStateAction, Dispatch, useState, useEffect } from "react";
import useLogin from "../hooks/useLogin";
import useRegister from "../hooks/useRegister";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";

type LoginPropsType = {
    setIsAuth: Dispatch<SetStateAction<boolean>>
}

const LoginPage = ({ setIsAuth }: LoginPropsType) => {
  const { auth, setAuth } = useAuth();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [user_name, setUser_name] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const login = useLogin();
  const register = useRegister();

  const handleSubmit = () => {
    setLoading(true);
    if (!user_name || !password) {
        setErrMsg('Input field cannout empty');
        setLoading(false);
        return
    }
    
    if (!isSignUp) {
        login(user_name, password, setLoading, setIsAuth, setSuccess);
    } else {
        if (password !== confirm) {
            setErrMsg('Password not match');
            setLoading(false);
            return
        }
        
        register(user_name, password, setIsSignUp, setLoading, setSuccess);
        setLoading(false);
    }

    if (success) {
        setConfirm('');
        setPassword('');
        setUser_name('');
    }

    setErrMsg(auth.errMsg);
  }

  useEffect(() => {
    if ( user_name !== '' || password !== '' ) {
        setErrMsg('');
        setAuth({ ...auth, errMsg: '' });
    }
  }, [user_name, password, confirm])

  useEffect(() => {
    console.log('loading state', loading)
  }, [loading])

  return (
    <div className="login-wrap">
        <form className="login-page">
        <button onClick={() => setIsAuth(false)} type="button" className="close-button">X</button>
            <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>

            <div className="input-form">
                <label htmlFor="user_name">Name :</label>
                <input type="text" id="user_name" autoComplete="off" autoFocus onChange={(e) => setUser_name(e.target.value)} value={user_name} />
            </div>

            <div className="input-form">
                <label htmlFor="password">Password :</label>
                <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            </div>

            {isSignUp && (
                <div className="input-form">
                    <label htmlFor="confirm">Confirm :</label>
                    <input type="password" id="confirm" onChange={(e) => setConfirm(e.target.value)} value={confirm} />
                </div>
            )}

            <div className="option">
                <p>{isSignUp ? "Already have an account ?" : "Not have any account ?"}</p>
                <button type="button" className="sign-button" onClick={() => setIsSignUp(prev => !prev)}>Sign {isSignUp ? "In" : "Up"} here</button>
            </div>

            <p className={errMsg === '' ? "off-screen" : "error"}>{errMsg}</p>
            {loading ? (
                <Loading />
            ) : (
                <button onClick={() => handleSubmit()} type="button" className="sign-button">Sign {isSignUp ? "Up" : "In"}</button>
            )}
        </form>
    </div>
  )
}

export default LoginPage