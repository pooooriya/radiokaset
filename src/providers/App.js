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
  doctorInfo: null,
  setDoctorInfo: () => {},
  role: null,
  setRole: () => {},
  token: null,
  setToken: () => {},
  collapse: false,
  setCollapse: () => {},
  notifications: {},
  setNotifications: () => {},
});

export const AppProvider = (props) => {
  const [isAuthenticated, setAuthenticated] = useState(props.authenticated);
  const [userID, setUserID] = useState(props.userID);
  const [token, setToken] = useState(props.token);
  const [userInfo, setUserInfo] = useState(props.userInfo);
  const [doctorInfo, setDcotorInfo] = useState(props.doctorInfo);
  const [role, setRole] = useState(props.role);
  const [collapse, setCollapse] = useState(props.collapse);
  const [notifications, setNotifications] = useState(props.notifications);

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
        doctorInfo,
        setDcotorInfo,
        role,
        setRole,
        collapse,
        setCollapse,
        notifications,
        setNotifications,
      }}
    >
      {props.children}
    </appContext.Provider>
  );
};
