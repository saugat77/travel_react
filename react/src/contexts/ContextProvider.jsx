import { createContext, useContext, useState } from "react"
import { useEffect } from "react";
const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => { },
  setToken: () => { },
})

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN')
    }
  }
  // Check for inactivity and set token to null if inactive for longer time (e.g., 30 minutes)
  const MAX_INACTIVE_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

  useEffect(() => {
    const checkInactivity = setInterval(() => {
      if (Date.now() - lastActivityTime > MAX_INACTIVE_TIME && token) {
        setToken(null); // Set token to null if inactive for longer time and token is not null
      }
    }, 1000); // Check every second for inactivity

    return () => clearInterval(checkInactivity); // Cleanup interval on component unmount
  }, [lastActivityTime, token]);

  return (
    <StateContext.Provider value={{
      user,
      token,
      setUser,
      setToken,
    }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);
