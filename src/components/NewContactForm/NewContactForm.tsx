import { AutoComplete, Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { createContact } from '../../store/reducers/contactsSlice';
import './NewContactForm.sass';

type InputsForm = {
  name: string;
  city: string;
  street: string;
  phone: string;
  email: string;
  website: string;
};

export const NewContactForm: React.FC<{
  getData: () => void;
  setIsModalVisible: (arg0: boolean) => void;
  setMessageError: (arg0: string) => void;
}> = ({ getData, setIsModalVisible, setMessageError }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);

  const onFinish = async (values: InputsForm) => {
    const response = await dispatch(
      createContact({
        name: values.name,
        city: values.city,
        street: values.street,
        phone: values.phone,
        email: values.email,
        website: values.website,
      })
    );
    if (response.meta.requestStatus === 'fulfilled') {
      getData();
    } else {
      setIsModalVisible(true);
      setMessageError('Не удалось создать контакт...');
    }
  };

  const onWebsiteChange = (value: string) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <div className="form-contacts">
      <Form form={form} name="" layout="inline" onFinish={onFinish} scrollToFirstError>
        <Form.Item
          name="name"
          label="Имя"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="city"
          label="Город"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="street"
          label="Улица"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Телефон"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Почта"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="website"
          label="Сайт"
          rules={[
            {
              required: true,
              message: 'Please input website!',
            },
          ]}
        >
          <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
            <Input />
          </AutoComplete>
        </Form.Item>

        <Button className="form-contacts__btn" type="primary" htmlType="submit">
          Добавить контакт
        </Button>
      </Form>
    </div>
  );
};
