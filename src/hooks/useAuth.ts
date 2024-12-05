import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import { UseAuthContextType } from "../context/AuthProvider";

const useAuth = (): UseAuthContextType => useContext(AuthContext);

export default useAuth;