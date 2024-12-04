import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('loggedInUser')) || null);

    const register = (name, email, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const newUser = { name, email, password };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
    };

  
    const login = (email, password) => {
        
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
            setUser(foundUser);
            return true;
        }

        return false;
    };

    

    return (
        <AuthContext.Provider value={{ user, login, register }}>
            {children}
        </AuthContext.Provider>
    );
};
