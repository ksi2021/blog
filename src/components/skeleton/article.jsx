import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function SkeletonArticle() {
  return (
    <div>
      <div
        style={{
          marginTop: '20px',
          width: '90%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ maxWidth: '80%' }}>
            <div style={{ display: 'flex' }}>
              <Skeleton width={200} />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: 10,
                }}
              >
                <Skeleton circle={true} height={20} width={20} />
                <Skeleton width={30} style={{ marginLeft: 10 }} />
              </div>
            </div>
            <div style={{ display: 'flex' }}>
              <Skeleton width={50} style={{ marginRight: 5 }} />
              <Skeleton width={50} style={{ marginRight: 5 }} />
              <Skeleton width={50} style={{ marginRight: 5 }} />
              <Skeleton width={50} style={{ marginRight: 5 }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: 10 }}>
              <Skeleton width={100} />
              <Skeleton width={100} />
            </div>

            <Skeleton circle={true} height={50} width={50} />
          </div>
        </div>

        <Skeleton count={4} />
      </div>
    </div>
  );
}

export default SkeletonArticle;
