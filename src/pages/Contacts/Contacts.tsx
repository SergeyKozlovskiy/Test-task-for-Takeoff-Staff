import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { getContacts } from '../../store/reducers/contactsSlice';

export const Contacts: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  return <h2>Контакты</h2>;
};
