import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import SkeletonArticle from './article';
import SkeletonPagination from './pagination';

function SkeletonArticleList() {
  return (
    <>
      {Array(5)
        .fill()
        .map((el, idx) => (
          <SkeletonArticle key={idx} />
        ))}
      <SkeletonPagination />
    </>
  );
}

export default SkeletonArticleList;
