import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { getContacts } from '../../store/reducers/contactsSlice';
import { Contact, DataTable } from '../../types/types';

export const Contacts: React.FC = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<DataTable[]>();

  const getData = async () => {
    const response = await dispatch(getContacts());
    if (response.meta.requestStatus === 'fulfilled') {
      const payload = response.payload as Contact[];
      setData(
        payload.map((user) => {
          return {
            key: user.id,
            name: user.name,
            address: `${user.address.city} ${user.address.street}`,
            phone: user.phone,
            email: user.email,
            website: user.website,
          };
        })
      );
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: (text: string) => <a href={text}>{text}</a>,
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <Table columns={columns} dataSource={data} pagination={{ total: data?.length, pageSize: 5 }} />
  );
};
