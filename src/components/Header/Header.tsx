import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { LinkMenu } from '../LinkMenu/LinkMenu';
import { useCookies } from 'react-cookie';
import './Header.sass';
import { authSlice } from '../../store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { isLogin, user } = useAppSelector((state) => state.authSlice);
  const [, , removeCookie] = useCookies(['id', 'name', 'email', 'token']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    removeCookie('id');
    removeCookie('name');
    removeCookie('email');
    removeCookie('token');
    dispatch(authSlice.actions.setUser(null));
    dispatch(authSlice.actions.setIsLogin(false));
    navigate('/');
  };

  return (
    <header className="header">
      <ul>
        <LinkMenu path="/" text="Главная" />
        <LinkMenu path="/authorization" text="Авторизация" />
        {isLogin ? <LinkMenu path="/contacts" text="Контакты" /> : null}
      </ul>
      {isLogin && user ? (
        <>
          <div className="">Здравствуйте, {user.user.name}</div>
          <Button onClick={logOut}>Выйти</Button>
        </>
      ) : null}
    </header>
  );
};
