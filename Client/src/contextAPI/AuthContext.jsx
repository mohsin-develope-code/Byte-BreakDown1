import { createContext, useContext, useState, useEffect } from "react"; 

export const userContext = createContext();

export const UserContext = () => {
    return useContext(userContext);
} 


export const Context = ({children}) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 


    const [userName, setUserName] = useState(() => {
        return localStorage.getItem("userName") || "";
    });


    const [login, setLogin] = useState(() => {
        const storedLogin = localStorage.getItem("login");
        return storedLogin === 'true' || false;
    });


    useEffect(() => {
        localStorage.setItem("login", login);
        localStorage.setItem("userName", userName);
      }, [login, userName]); 



    return (

        <userContext.Provider  value={{userName, setUserName, 
                                       login , setLogin,
                                       loading, setLoading,
                                       error, setError, 
                                     }}>
            {children}
        </userContext.Provider>
    )
}