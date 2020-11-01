import { createContext, useState, useEffect } from 'react';
import { setCookie, destroyCookie } from 'nookies';
import axios from 'axios';

export const appContext = createContext({
  isAuthenticated: false,
  setAuthenticated: () => {},
  userID: null,
  setUserID: () => {},
  userInfo: null,
  setUserInfo: () => {},
  playlist: null,
  setPLaylist: () => {},
  role: null,
  setRole: () => {},
  token: null,
  setToken: () => {},
  collapse: false,
  setCollapse: () => {},
  isPlaying: false,
  setIsPlaying: () => {},
  notifications: {},
  setNotifications: () => {},
  currentIndex: 0,
  setCurrentIndex: () => {},
});

export const AppProvider = (props) => {
  const [isAuthenticated, setAuthenticated] = useState(props.authenticated);
  const [userID, setUserID] = useState(props.userID);
  const [token, setToken] = useState(props.token);
  const [userInfo, setUserInfo] = useState(props.userInfo);
  const [playlist, setPLaylist] = useState([]);
  const [isPlaying, setIsPlaying] = useState(props.isPlaying);
  const [role, setRole] = useState(props.role);
  const [collapse, setCollapse] = useState(props.collapse);
  const [notifications, setNotifications] = useState(props.notifications);
  const [currentIndex, setCurrentIndex] = useState(props.currentIndex);

  useEffect(() => {
    if (!isAuthenticated) {
      destroyCookie(null, 'token');
      destroyCookie(null, 'user');
      setUserID(null);
      setToken(null);
      setUserInfo(null);
      setRole(null);
      setNotifications({});
      axios.defaults.headers.common['Authorization'] = ``;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!collapse) {
      setCookie(null, 'collapse', false, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    } else {
      setCookie(null, 'collapse', true, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    }
  }, [collapse]);

  return (
    <appContext.Provider
      value={{
        isAuthenticated,
        setAuthenticated,
        userID,
        setUserID,
        token,
        setToken,
        userInfo,
        setUserInfo,
        playlist,
        setPLaylist,
        role,
        setRole,
        collapse,
        setCollapse,
        isPlaying,
        setIsPlaying,
        notifications,
        setNotifications,
        currentIndex,
        setCurrentIndex,
      }}
    >
      {props.children}
    </appContext.Provider>
  );
};
