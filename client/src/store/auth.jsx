import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem('token', serverToken);
    };

    let isLoggedIn = !! token;
    // console.log("isLoggedIn", isLoggedIn);

    // tacking logout funcationality
    const LogoutUser = () => {
        setToken("");
        setUser("");
        return localStorage.removeItem('token');
    };

    // JWT Authentication - to get the current login user data

    const userAuthentication = async() => {
        try {
            setIsLoading(true);
            const response = await fetch("http://localhost:5000/api/auth/user",{
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });

            // console.log("Response status:", response.status);
            if (response.ok) {
                const data = await response.json();
                // console.log("user data",data.userData);
                setUser(data.userData);
                setIsLoading(false);
            } else {
                console.error("Error fetching user data");
                setIsLoading(false);
            }
        } catch (error) {
            console.log("Error fetching user data");
        }
    }

    useEffect(() => {
        userAuthentication();
    }, []);


    return( <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, authorizationToken, isLoading}}>
        {children} 
    </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValues = useContext(AuthContext);
    if(!authContextValues) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValues;
}