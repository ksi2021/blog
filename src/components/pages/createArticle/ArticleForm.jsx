import React, { useEffect } from 'react';
import { Alert, Button, Form, Input, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import './articleForm.css';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import {
  createArticle,
  getArticleBySlug,
  updateArticle,
} from '../../store/articleReducer';
import SkeletonForm from '../../skeleton/form';

function ArticleForm({
  isEdit,
  authorization,
  article,
  user,
  loading,
  userLOADING,
}) {
  const { slug: id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEdit) dispatch(getArticleBySlug(id));
  }, [id]);

  const [form] = useForm();
  const onFinish = (data) => {
    if(isEdit)dispatch(updateArticle({ article: data, slug: id }));
    else dispatch(createArticle(data));
    navigate('/');
  };
  const editArticleData = {
    title: article?.title,
    description: article?.description,
    tagList: article?.tagList,
    body: article?.body,
  };

  const createArticleData = {
    title: '',
    description: '',
    tagList: [],
    body: '',
  };

  useEffect(() => {
    form.setFieldsValue(isEdit ? editArticleData : createArticleData);
  }, [isEdit, loading]);

  if (userLOADING) return <SkeletonForm />;
  // if (userLOADING) return <h1>form</h1>;
  if (!authorization) return <Navigate to={'/sign-in'} />;
  if (isEdit && !article)
    return (
      <Alert
        message="Error"
        description="Article not found"
        type="error"
        showIcon
        style={{
          width: '50%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 30,
        }}
      />
    );
  if (isEdit && article.author.username !== user.username)
    return <Navigate to={'/'} />;

  return (
    <Form
      // initialValues={isEdit ? editArticleData : createArticleData}
      layout="vertical"
      form={form}
      onFinish={onFinish}
      style={{
        padding: 20,
        width: 500,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
      }}
    >
      <h2 style={{ textAlign: 'center' }}>
        {isEdit ? 'Edit article' : 'Create new article'}
      </h2>
      <Form.Item
        hasFeedback
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Поле обязательно для заполнения',
          },
          {
            min: 6,
            message: 'Минимальная длина 6 симоволов',
          },
          {
            max: 50,
            message: 'Максимальная длина 50 симоволов',
          },
        ]}
      >
        <Input placeholder="Title" />
      </Form.Item>

      <Form.Item
        hasFeedback
        label="Short description"
        name="description"
        validateFirst
        rules={[
          {
            required: true,
            message: 'Поле обязательно для заполнения',
          },
          {
            min: 10,
            message: 'Минимальная длина 10 симоволов',
          },
          {
            max: 100,
            message: 'Максимальная длина 100 симоволов',
          },
        ]}
      >
        <Input placeholder="Short description" />
      </Form.Item>
      <Form.Item
        label="Text"
        name="body"
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Поле обязательно для заполнения',
          },
          {
            min: 10,
            message: 'Минимальная длина 10 симоволов',
          },
          {
            max: 3000,
            message: 'Максимальная длина 3 000 симоволов',
          },
        ]}
      >
        <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} showCount />
      </Form.Item>

      <Form.List name="tagList" label="Tags">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space
                key={key}
                style={{ display: 'flex', marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={name}
                  fieldKey={fieldKey}
                  rules={[{ required: true, message: 'Missing tag' }]}
                >
                  <Input placeholder="Tag" />
                </Form.Item>
                <Button
                  type="primary"
                  danger
                  onClick={() => remove(name)}
                  icon={<MinusCircleOutlined />}
                >
                  {' '}
                  Delete{' '}
                </Button>
              </Space>
            ))}
            <Form.Item>
              <Button
                type="primary"
                style={{ height: 40 }}
                onClick={() => add()}
                icon={<PlusOutlined />}
              >
                Add Tag
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Button type="primary" style={{ height: 40 }} htmlType="submit">
        Send
      </Button>
    </Form>
  );
}

const mapStateToProps = (state) => {
  return {
    authorization: state.user.authorization,
    article: state.article.article,
    loading: state.article.loading,
    user: state.user.user,
    userLOADING: state.user.loading,
  };
};

export default connect(mapStateToProps)(ArticleForm);
