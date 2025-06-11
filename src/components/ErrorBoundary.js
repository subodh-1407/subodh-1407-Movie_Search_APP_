import React from 'react';

function LoadingPlaceholder() {
  return (
    <>
      <div className="loading-placeholder" role="alert" aria-busy="true">
        Loading...
      </div>
      <style>{`
        .loading-placeholder {
          font-size: 1.2rem;
          font-style: italic;
          color: #aaa;
          text-align: center;
          margin-top: 2rem;
        }
      `}</style>
    </>
  );
}

export default LoadingPlaceholder;
