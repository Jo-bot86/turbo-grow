import {createContext, useState, useEffect, useCallback, type ReactNode, useContext} from "react";
import api from "../api/api";
import {authService, type LoginRequest, type LoginResponde, type RegisterRequest} from "../api/service/auth/authService";
import type {UserDTO} from "../api/types/user/userType"

interface AuthContextType {
    user: UserDTO | null;
    token: string | null;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<LoginResponde>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: { children: ReactNode }) => {

    const [user, setUser] = useState<UserDTO | null>(JSON.parse(localStorage.getItem('user') || '{}'));
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete api.defaults.headers.common["Authorization"];
        }
    }, [token]);



    // @ts-ignore
    const register = useCallback(async (data: RegisterRequest) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        return await authService.register(data)
    },[]);

    const login = useCallback(async (data: LoginRequest) => {
        const receivedData = await authService.login(data);
        // @ts-ignore
        const {token, userDTO}: LoginResponde = receivedData;
        setToken(token);
        setUser(userDTO);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userDTO));
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },[])

    return(

        <AuthContext.Provider value={{user, token, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
    return ctx;
};