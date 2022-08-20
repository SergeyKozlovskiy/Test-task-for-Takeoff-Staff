import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Page404 } from './pages/404/Page404';
import { Authorization } from './pages/Authorization/Authorization';
import { Contacts } from './pages/Contacts/Contacts';
import { Main } from './pages/Main/Main';
import { Header } from './components/Header/Header';
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { authSlice } from './store/reducers/authSlice';
import './App.sass';

function App() {
  const dispatch = useAppDispatch();
  const { isLogin } = useAppSelector((state) => state.authSlice);
  const [cookie] = useCookies(['id', 'name', 'email', 'token']);

  const checkLogin = () => {
    if (cookie.id && cookie.name && cookie.email && cookie.token) {
      const user = {
        accessToken: cookie.token,
        user: {
          id: cookie.id,
          email: cookie.email,
          name: cookie.name,
        },
      };
      dispatch(authSlice.actions.setUser(user));
      dispatch(authSlice.actions.setIsLogin(true));
    } else {
      dispatch(authSlice.actions.setUser(null));
      dispatch(authSlice.actions.setIsLogin(false));
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="authorization" element={<Authorization />} />
        <Route path="contacts" element={isLogin ? <Contacts /> : <Page404 />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
