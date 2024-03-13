import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonForm() {
  return (
    <>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '400px',
          margin: '20px auto',
          padding: '20px',
          background: 'white',
        }}
      >
        <h2 style={{ textAlign: 'center' }}>
          <Skeleton width="60%" />
        </h2>

        <Skeleton width={200} />
        <Skeleton height={20} style={{ marginBottom: '20px' }} />

        <Skeleton width={200} />
        <Skeleton height={20} style={{ marginBottom: '20px' }} />

        <Skeleton width={200} />
        <Skeleton height={20} style={{ marginBottom: '20px' }} />

        <Skeleton width={200} />
        <Skeleton height={20} style={{ marginBottom: '20px' }} />

        <Skeleton width={200} />
        <Skeleton height={20} style={{ marginBottom: '10px' }} />

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <Skeleton width={200} height={30} />
        </div>
      </form>
    </>
  );
}

export default SkeletonForm;
