import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (name: string, email: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem("match-mania-user");
        return saved ? JSON.parse(saved) : null;
    });

    const login = (name: string, email: string) => {
        const newUser = { name, email };
        setUser(newUser);
        localStorage.setItem("match-mania-user", JSON.stringify(newUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("match-mania-user");
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
