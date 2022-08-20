import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import './LinkMenu.sass';

export const LinkMenu: React.FC<{ path: string; text: string }> = ({ path, text }) => {
  return (
    <li>
      <Button type="link">
        <NavLink to={path}>{text}</NavLink>
      </Button>
    </li>
  );
};
