import { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { Button, Input, Modal } from 'antd';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { signIn, signUp } from '../../store/reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/types';
import { ONE_HOUR } from '../../utils/constants';
import { useCookies } from 'react-cookie';
import './Authorization.sass';

type FormInputs = {
  name: string;
  email: string;
  password: string;
  isRemember: boolean;
};

export const Authorization: React.FC = () => {
  const [isRegistration, setIsRegistration] = useState(true);
  const [, setCookie] = useCookies(['id', 'name', 'email', 'token']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
  } = useForm<FormInputs>({
    mode: 'onChange',
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    reset();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    reset();
  };
  const saveData = (user: User) => {
    const {
      accessToken,
      user: { id, name, email },
    } = user as User;
    setCookie('id', id, { path: '/', maxAge: ONE_HOUR });
    setCookie('name', name, { path: '/', maxAge: ONE_HOUR });
    setCookie('email', email, { path: '/', maxAge: ONE_HOUR });
    setCookie('token', accessToken, { path: '/', maxAge: ONE_HOUR });
  };

  const onSubmit: SubmitHandler<FormInputs> = async ({ name, email, password }) => {
    if (isRegistration) {
      const response = await dispatch(signUp({ name: name, email: email, password }));
      if (response.meta.requestStatus === 'fulfilled') {
        saveData(response.payload);
        reset();
        navigate('/');
      } else {
        showModal();
      }
    } else {
      const response = await dispatch(signIn({ email: email, password }));
      if (response.meta.requestStatus === 'fulfilled') {
        saveData(response.payload);
        reset();
        navigate('/');
      }
    }
  };

  return (
    <div className="auth">
      <Modal
        title="Что то пошло не так..."
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Ошибка при регистрации. Возможно пользователь с таким email уже зарегестрирован.</p>
      </Modal>
      <h2 className="auth-title">{isRegistration ? 'Регистрация' : 'Вход'}</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        {isRegistration ? (
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Поле обязательно к заполнению',
              minLength: {
                value: 2,
                message: 'Длинна имени должна быть от 2 до 16 символов',
              },
              maxLength: {
                value: 16,
                message: 'Длинна имени должна быть от 2 до 16 символов',
              },
              pattern: {
                value: /^([А-Я]{1}[а-яё]{1,}|[A-Z]{1}[a-z]{1,})$/,
                message:
                  'Имя должно: начинаться с большой буквы, состоять из букв кирриллицы или латинского алфавита, содержать только буквенные символы',
              },
            }}
            render={({ field }) => {
              return (
                <label>
                  Имя
                  <Input
                    placeholder="Введите имя"
                    {...field}
                    status={errors.name ? 'error' : undefined}
                  />
                  <div className="form-error">
                    {errors.name && <span>{errors.name.message || 'Ошибка'}</span>}
                  </div>
                </label>
              );
            }}
          />
        ) : null}
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'Поле обязательно к заполнению',
            minLength: {
              value: 4,
              message: 'Длинна почты должна быть от 4 до 8 символов',
            },
            maxLength: {
              value: 24,
              message: 'Длинна почты должна быть от 2 до 24 символов',
            },
            pattern: {
              value: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/,
              message: 'Некорректная почта',
            },
          }}
          render={({ field }) => {
            return (
              <label>
                Почта
                <Input
                  placeholder="Введите вашу почту"
                  {...field}
                  status={errors.email ? 'error' : undefined}
                />
                <div className="form-error">
                  {errors.email && <span>{errors.email.message || 'Ошибка'}</span>}
                </div>
              </label>
            );
          }}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: 'Поле обязательно к заполнению',
            minLength: {
              value: 8,
              message: 'Длинна пароля должна быть от 8 до 16 символов',
            },
            maxLength: {
              value: 16,
              message: 'Длинна пароля должна быть от 8 до 16 символов',
            },
            pattern: {
              value: /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g,
              message:
                'Пароль должен содержать: числа, латинские буквы в верхнем и нижнем регистре, спецсимволы',
            },
          }}
          render={({ field }) => {
            return (
              <label>
                Пароль
                <Input.Password
                  placeholder="Введите пароль"
                  {...field}
                  status={errors.password ? 'error' : undefined}
                />
                <div className="form-error">
                  {errors.password && <span>{errors.password.message || 'Ошибка'}</span>}
                </div>
              </label>
            );
          }}
        />
        <button className="form-link" onClick={() => setIsRegistration(!isRegistration)}>
          {isRegistration ? 'Войти' : 'Зарегестрироваться'}
        </button>
        <Button disabled={!isValid} type="primary" htmlType="submit" className="form-btn">
          {isRegistration ? 'Зарегестрироваться' : 'Войти'}
        </Button>
      </form>
    </div>
  );
};
