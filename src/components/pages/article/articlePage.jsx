import { Card, Avatar, Button, Tag, Popconfirm, Alert } from 'antd';
import { matchRoutes, NavLink, useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { connect, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Markdown from 'react-markdown';

import {
  getArticleBySlug,
  deleteArticle,
} from '../../store/articleReducer';
import SkeletonArticlePage from '../../skeleton/articlePage';
import FavoriteButton from '../../actionButtons/favoriteButton';

import avatarImage from './avatar.png';

function ArticlePage({ article, user, authorization, loading }) {
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

  if (loading) return <SkeletonArticlePage />;
  if (!article)
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
          {/* <Button */}
          {/*   disabled={!authorization && true} */}
          {/*   type="link" */}
          {/*   style={{ width: '20px', marginLeft: '10px', color: article.favorited ? 'red': '#1677ff'}} */}
          {/*   icon={<HeartOutlined />} */}
          {/*   onClick={() => */}
          {/*     // eslint-disable-next-line no-nested-ternary */}
          {/*     authorization */}
          {/*       ? article.favorited */}
          {/*         ? dispatch(dislikeArticle(article.slug)) */}
          {/*         : dispatch(likeArticle(article.slug)) */}
          {/*       : null */}
          {/*   } */}
          {/* /> */}
          <FavoriteButton slug={article.slug} favorited={article.favorited} authorization={authorization}/>
          {article.favoritesCount}
          <div>
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
    loading: state.article.loading,
  };
};

export default connect(mapStateToProps)(ArticlePage);
