import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { HeartOutlined } from '@ant-design/icons';

import { dislikeArticle, likeArticle } from '../store/articleReducer';

export default function FavoriteButton({authorization , favorited , slug}){
  const dispatch = useDispatch();
  return (
    <Button
      disabled={!authorization && true}
      type="link"
      style={{ width: '20px', marginLeft: '10px', color: favorited ? 'red': '#1677ff'}}
      icon={<HeartOutlined />}
      onClick={() =>
        authorization
          ? favorited
            ? dispatch(dislikeArticle(slug))
            : dispatch(likeArticle(slug))
          : null
      }
    />
  );
}