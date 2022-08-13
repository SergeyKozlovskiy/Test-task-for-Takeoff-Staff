import { NavLink } from 'react-router-dom';
export const Main: React.FC = () => {
  return (
    <div className="main">
      <h1>Главная</h1>
      <NavLink to="/authorization">Авторизация</NavLink>
      <NavLink to="/contacts">Контакты</NavLink>
    </div>
  );
};
