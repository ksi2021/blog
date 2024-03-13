import React from 'react';
import { useForm } from 'react-hook-form';
import { Space, Typography, Button, Alert } from 'antd';
import { Navigate, NavLink } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import './register.css';
import { registration } from '../../store/userReducer';
import SkeletonForm from '../../skeleton/form';

const { Text, Link } = Typography;
function RegistrationForm({ err, authorization, loading }) {
  if (loading) return <SkeletonForm />;
  // if (loading) return <h1>form</h1>;
  if (authorization) return <Navigate to={'/profile'} />;

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = React.useRef({});
  password.current = watch('password', '');

  const onSubmit = (data) => {
    dispatch(registration(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {err.map((el, id) => (
        <Alert message={el} key={id} type="error" />
      ))}
      <h2 style={{ textAlign: 'center' }}>Create new account</h2>
      <label>
        Username
        <input
          placeholder={'Username'}
          style={{ borderColor: errors.username ? 'red' : '' }}
          {...register('username', {
            required: 'Обязательное поле',
            minLength: {
              value: 3,
              message: 'Минимум 3 символа',
            },
            maxLength: {
              value: 20,
              message: 'Максимум 20 символов',
            },
          })}
        />
        <Text type="danger">
          {errors.username && <p>{errors.username.message}</p>}
        </Text>
      </label>
      <label>
        Email address
        <input
          style={{ borderColor: errors.email ? 'red' : '' }}
          placeholder={' Email address'}
          {...register('email', {
            required: 'Обязательное поле',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Неверный адрес электронной почты',
            },
          })}
        />
        <Text type="danger">
          {errors.email && <p>{errors.email.message}</p>}
        </Text>
      </label>
      <label>
        Password
        <input
          style={{ borderColor: errors.password ? 'red' : '' }}
          placeholder="Password"
          {...register('password', {
            required: 'Обязательное поле',
            minLength: {
              value: 6,
              message: 'Минимум 6 символов',
            },
            maxLength: {
              value: 40,
              message: 'Максимум 40 символов',
            },
          })}
        />
        <Text type="danger">
          {errors.password && <p>{errors.password.message}</p>}
        </Text>
      </label>
      <label>
        Repeat password
        <input
          style={{ borderColor: errors.repeatPassword ? 'red' : '' }}
          placeholder={' Repeat password'}
          {...register('repeatPassword', {
            required: 'Обязательное поле',
            validate: (value) =>
              value === password.current || 'Пароли должны совпадать',
          })}
        />
      </label>

      <label className={'checkBoxBlock'}>
        <input
          type="checkbox"
          style={{ background: errors.terms ? 'red' : '' }}
          {...register('terms', {
            required: 'Вы должны согласиться с обработкой персональных данных',
          })}
        />
        I agree to the processing of my personal information
        <Text type="danger">
          {errors.terms && <p>{errors.terms.message}</p>}
        </Text>
      </label>

      <Button
        style={{ height: '40px' }}
        type="primary"
        htmlType={'submit'}
        block
      >
        Create
      </Button>

      <div className={'form-add'}>
        Already have an account ? &nbsp;
        <NavLink
          style={{ color: '#00bfff', textDecoration: 'none' }}
          to={'/sign-in'}
        >
          Sign in
        </NavLink>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    err: state.user.errors,
    loading: state.user.loading,
    authorization: state.user.authorization,
  };
};

export default connect(mapStateToProps)(RegistrationForm);
