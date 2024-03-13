import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonPagination() {
  return (
    <div
      style={{
        marginTop: 30,
        marginBottom: 30,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Skeleton width={250} height={20} />
    </div>
  );
}

export default SkeletonPagination;
