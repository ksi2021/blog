import { Card, Avatar, Tag } from 'antd';
import { NavLink } from 'react-router-dom';
import { format } from 'date-fns';

import ArticlePagination from '../pagination/pagination';
import FavoriteButton from '../actionButtons/favoriteButton';

import avatarImage from './avatar.png';

function Article({
  slug,
  tagList,
  author,
  title,
  updatedAt,
  favoritesCount,
  description,
  authorization,
  favorited
}) {
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
          <NavLink to={`/article/${slug}`}>{title}</NavLink>
          {/* <Button */}
          {/*   disabled={!authorization && true} */}
          {/*   type="link" */}
          {/*   style={{ width: '20px', marginLeft: '10px' }} */}
          {/*   icon={<HeartOutlined />} */}
          {/* /> */}
          <FavoriteButton slug={slug} favorited={favorited} authorization={authorization}/>
          {favoritesCount}
          <div>
            {tagList.map((tag, id) => (
              <Tag
                key={id}
                style={{ marginBottom: '5px', whiteSpace: 'pre-wrap' }}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex' }}>
          <div>
            <div>{author.username}</div>
            <div>{format(new Date(updatedAt), 'MMMM dd, yyyy')}</div>
          </div>

          <Avatar
            style={{ verticalAlign: 'middle', marginLeft: '5px' }}
            src={<img src={author.image || avatarImage} alt="avatar" />}
            size="large"
          />
        </div>
      </div>

      <div>{description}</div>
    </Card>
  );
}

export default Article;
