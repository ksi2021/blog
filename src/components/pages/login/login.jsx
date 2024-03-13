import React from 'react';
import { useForm } from 'react-hook-form';
import { Space, Typography, Button, Alert } from 'antd';
import { NavLink, Navigate } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';

import { login } from '../../store/userReducer';
import './login.css';
import SkeletonForm from '../../skeleton/form';

const { Text, Link } = Typography;
function LoginForm({ authorization, err, loading }) {
  if (loading) return <SkeletonForm />;
  // if (loading) return <h1>form</h1>;
  if (authorization) return <Navigate to={'/profile'} />;
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const password = React.useRef({});
  password.current = watch('password', '');

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {err.map((el, id) => (
        <Alert message={el} key={id} type="error" />
      ))}
      <h2 style={{ textAlign: 'center' }}>Sign In</h2>

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

      <Button
        style={{ height: '40px' }}
        type="primary"
        htmlType={'submit'}
        block
      >
        Login
      </Button>

      <div className={'form-add'}>
        Don`t have an account ? &nbsp;
        <NavLink
          style={{ color: '#00bfff', textDecoration: 'none' }}
          to={'/sign-up'}
        >
          Sign up
        </NavLink>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    authorization: state.user.authorization,
    loading: state.user.loading,
    err: state.user.errors,
  };
};
export default connect(mapStateToProps)(LoginForm);
