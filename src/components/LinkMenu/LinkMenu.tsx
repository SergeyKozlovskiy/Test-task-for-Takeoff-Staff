import { NavLink } from 'react-router-dom';
import './LinkMenu.sass';

export const LinkMenu: React.FC<{ path: string; text: string }> = ({ path, text }) => {
  return (
    <li>
      <NavLink className={({ isActive }) => (isActive ? 'active-link' : undefined)} to={path}>
        {text}
      </NavLink>
    </li>
  );
};
