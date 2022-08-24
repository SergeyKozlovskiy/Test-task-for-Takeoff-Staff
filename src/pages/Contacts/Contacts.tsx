import { Button, Modal, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import { ChangeEvent, useEffect, useState } from 'react';
import { NewContactForm } from '../../components/NewContactForm/NewContactForm';
import { useAppDispatch } from '../../hooks/redux';
import { changeContact, deleteContact, getContacts } from '../../store/reducers/contactsSlice';
import { Contact, DataTable } from '../../types/types';
import './Contacts.sass';

export const Contacts: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [data, setData] = useState<DataTable[]>([]);
  const [resultSearch, setResultSearch] = useState<DataTable[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (data: { name: string; id: number }) => (
        <input
          defaultValue={data.name}
          onChange={(event) => changeParam(data.id, event, 'name')}
        ></input>
      ),
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      render: (data: { city: string; id: number }) => (
        <input
          defaultValue={data.city}
          onChange={(event) => changeParam(data.id, event, 'city')}
        ></input>
      ),
    },
    {
      title: 'Street',
      dataIndex: 'street',
      key: 'street',
      render: (data: { street: string; id: number }) => (
        <input
          defaultValue={data.street}
          onChange={(event) => changeParam(data.id, event, 'street')}
        ></input>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      render: (data: { phone: string; id: number }) => (
        <input
          defaultValue={data.phone}
          onChange={(event) => changeParam(data.id, event, 'phone')}
        ></input>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (data: { email: string; id: number }) => (
        <input
          defaultValue={data.email}
          onChange={(event) => changeParam(data.id, event, 'email')}
        ></input>
      ),
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: (data: { website: string; id: number }) => (
        <input
          defaultValue={data.website}
          onChange={(event) => changeParam(data.id, event, 'website')}
        ></input>
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'id',
      key: 'delete',
      render: (id: number) => <Button onClick={() => handleDelete(id)}>Удалить</Button>,
    },
    {
      title: 'Change',
      dataIndex: 'id',
      key: 'change',
      render: (id: number) => <Button onClick={() => handleChange(id)}>Изменить</Button>,
    },
  ];

  const getData = async () => {
    const response = await dispatch(getContacts());
    if (response.meta.requestStatus === 'fulfilled') {
      const payload = response.payload as Contact[];
      setData(
        payload.map((user) => {
          return {
            id: user.id,
            key: user.id,
            name: { name: user.name, id: user.id },
            city: { city: user.address.city, id: user.id },
            street: { street: user.address.street, id: user.id },
            phone: { phone: user.phone, id: user.id },
            email: { email: user.email, id: user.id },
            website: { website: user.website, id: user.id },
          };
        })
      );
    }
  };

  const handleDelete = async (id: number) => {
    const response = await dispatch(deleteContact({ id: id }));
    if (response.meta.requestStatus === 'fulfilled') {
      getData();
    } else {
      setIsModalVisible(true);
      setMessageError('Не удалось удалить контакт...');
    }
  };

  const handleChange = async (id: number) => {
    const result = data.find((elem) => elem.id === id) as DataTable;
    const {
      name: { name },
      city: { city },
      street: { street },
      email: { email },
      website: { website },
      phone: { phone },
    } = result;

    const response = await dispatch(
      changeContact({
        name: name,
        id: id,
        city: city,
        street: street,
        email: email,
        website: website,
        phone: phone,
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      getData();
    } else {
      setIsModalVisible(true);
      setMessageError('Не удалось изменить контакт...');
    }
  };

  const changeParam = (id: number, event: ChangeEvent<HTMLInputElement>, key: string) => {
    setData((prevState) => {
      return prevState.map((elem) => {
        return elem.id === id
          ? { ...elem, [key]: { [key]: event.target.value, id: elem.id } }
          : elem;
      });
    });
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setMessageError('');
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMessageError('');
  };

  const onSearch = (value: string) => {
    if (value.length === 0) {
      setIsSearch(false);
      setResultSearch([]);
    } else {
      setIsSearch(true);
      setResultSearch(
        data.filter((elem) => elem.name.name.toLowerCase().includes(value.toLowerCase()))
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="contacts">
      <div className="contacts-table">
        {isModalVisible ? (
          <Modal
            title="Что то пошло не так..."
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>{messageError}</p>
          </Modal>
        ) : null}
        <Search
          className="contacts-search"
          placeholder="Имя контакта"
          onChange={(event) => onSearch(event.target.value)}
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
        <Table
          columns={columns}
          dataSource={isSearch ? resultSearch : data}
          pagination={{ total: isSearch ? resultSearch.length : data.length, pageSize: 5 }}
        />
        <NewContactForm
          getData={getData}
          setIsModalVisible={setIsModalVisible}
          setMessageError={setMessageError}
        />
      </div>
    </div>
  );
};
