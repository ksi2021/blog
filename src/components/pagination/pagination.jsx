import React, { useReducer } from 'react';
import { Pagination, Row } from 'antd';
import { useDispatch } from 'react-redux';

import { getArticles } from '../store/articleReducer';

const ArticlePagination = ({
  currentPage = 1,
  totalPages = 1,
  SearchByNewPage,
  setPage,
}) => {
  const dispatch = useDispatch();
  const switchPage = (page) => {
    dispatch(getArticles(page));
    dispatch(setPage(page));
  };

  return (
    <Row justify="center" style={{ marginTop: 30, marginBottom: 30 }}>
      <Pagination
        current={currentPage}
        total={totalPages}
        showSizeChanger={false}
        onChange={switchPage}
        pageSize={5}
      />
    </Row>
  );
};

export default ArticlePagination;
