import React from 'react';
import { useForm } from 'react-hook-form';
import { Space, Typography, Button } from 'antd';
import { Navigate, NavLink } from 'react-router-dom';
import './profile.css';
import { connect, useDispatch } from 'react-redux';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { update } from '../../store/userReducer';
import SkeletonForm from '../../skeleton/form';
import { getArticles } from '../../store/articleReducer';

const { Text, Link } = Typography;
function ProfileForm({ authorization, user, loading , page }) {
  if (loading) return <SkeletonForm />;
  // if (loading) return <h1>form</h1>;
  if (!authorization) return <Navigate to={'/sign-in'} />;

  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Обязательное поле')
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов'),
    email: yup
      .string()
      .required('Обязательное поле')
      .email('Неверный адрес электронной почты'),
    password: yup
      .string()
      .nullable()
      .transform((value) => (value === '' ? null : value))
      .min(6, 'Минимум 6 символов')
      .max(40, 'Максимум 40 символов'),
    image: yup
      .string()
      .url()
      .nullable()
      .transform((value) => (value === '' ? null : value)),
  });

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const password = React.useRef({});
  password.current = watch('password', '');

  const onSubmit = (data) => {
    const successData = {};
    const keys = Object.keys(data);
    keys.forEach((key) => {
      if (data[key]) successData[key] = data[key];
    });
    dispatch(update(successData)).then(() => {
      dispatch(getArticles(page));
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 style={{ textAlign: 'center' }}>Edit profile</h2>
      <label>
        Username
        <input
          defaultValue={user.username}
          placeholder={'Username'}
          style={{ borderColor: errors.username ? 'red' : '' }}
          {...register('username')}
        />
        <Text type="danger">
          {errors.username && <p>{errors.username.message}</p>}
        </Text>
      </label>
      <label>
        Email address
        <input
          defaultValue={user.email}
          style={{ borderColor: errors.email ? 'red' : '' }}
          placeholder={' Email address'}
          {...register('email')}
        />
        <Text type="danger">
          {errors.email && <p>{errors.email.message}</p>}
        </Text>
      </label>
      <label>
        New password
        <input
          style={{ borderColor: errors.password ? 'red' : '' }}
          placeholder=" New password"
          {...register('password')}
        />
        <Text type="danger">
          {errors.password && <p>{errors.password.message}</p>}
        </Text>
      </label>

      <label>
        Avatar image (url)
        <input
          style={{ borderColor: errors.image ? 'red' : '' }}
          placeholder="Avatar image"
          {...register('image')}
        />
        <Text type="danger">
          {errors.image && <p>{errors.image.message}</p>}
        </Text>
      </label>

      <Button
        style={{ height: '40px' }}
        type="primary"
        htmlType={'submit'}
        block
      >
        Save
      </Button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    authorization: state.user.authorization,
    loading: state.user.loading,
    user: state.user.user,
    page: state.article.page
  };
};

export default connect(mapStateToProps)(ProfileForm);
