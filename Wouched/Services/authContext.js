import React, { createContext, useContext, useState, useEffect } from 'react';
import{ jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [token, setToken] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token);
            if (decoded) {
                setUser(decoded.user);
                setToken(token)
                setAuthLoading(false);
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        setUser(decoded);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    

    return (
        <AuthContext.Provider value={{ user, login, logout,authLoading, token }}>
            {children}
        </AuthContext.Provider>
    );
};
