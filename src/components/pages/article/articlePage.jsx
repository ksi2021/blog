import { Card, Avatar, Button, Tag, Popconfirm } from 'antd';
import { matchRoutes, NavLink, useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Markdown from 'react-markdown';
// eslint-disable-next-line import/no-extraneous-dependencies
import { HeartOutlined } from '@ant-design/icons';

import { getArticleBySlug, deleteArticle } from '../../store/articleReducer';

import avatarImage from './avatar.png';
import headerImage from './heart.svg';

function ArticlePage({ article, user, authorization }) {
  const { slug: id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticleBySlug(id));
  }, [id]);

  const confirmDelete = () => {
    console.log('confirm');
    dispatch(deleteArticle(id));
    navigate('/');
  };

  if (!article) return <h1>article not found</h1>;

  return (
    <Card
      style={{
        marginTop: '20px',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ maxWidth: '80%' }}>
          <span>{article.title}</span>
          <Button
            type="link"
            style={{ width: '20px', marginLeft: '10px' }}
            icon={<HeartOutlined />}
          />
          {article.favoritesCount}
          <div>
            {/* eslint-disable-next-line no-shadow */}
            {article.tagList.map((tag, id) => (
              <Tag
                key={id}
                style={{ marginBottom: '5px', whiteSpace: 'pre-wrap' }}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <div>{article?.author?.username}</div>
              <div>{format(new Date(article.updatedAt), 'MMMM dd, yyyy')}</div>
            </div>

            <Avatar
              style={{ verticalAlign: 'middle', marginLeft: '5px' }}
              src={
                <img src={article.author.image || avatarImage} alt="avatar" />
              }
              size="large"
            />
          </div>
          {authorization &&
            user &&
            user.username === article.author.username && (
              <div>
                <Button.Group>
                  <Popconfirm
                    title="Вы уверены?"
                    placement={'left'}
                    onConfirm={confirmDelete}
                    okText="Да"
                    cancelText="Нет"
                  >
                    <Button danger>Delete</Button>
                  </Popconfirm>
                  <Button
                    style={{ borderColor: 'green', color: 'green' }}
                    onClick={() => navigate(`/articles/${article.slug}/edit`)}
                  >
                    Edit
                  </Button>
                </Button.Group>
              </div>
            )}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Markdown>{article.body}</Markdown>
      </div>
    </Card>
  );
}

const mapStateToProps = (state) => {
  return {
    article: state.article.article,
    authorization: state.user.authorization,
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(ArticlePage);
