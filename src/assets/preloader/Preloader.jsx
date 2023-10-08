import React from 'react';
import ContentLoader from 'react-content-loader';

const Preloader = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={459}
    viewBox="0 0 280 459"
    backgroundColor="#f3f3f3"
    foregroundColor="#ffdf8c"
    {...props}>
    <rect x="5" y="273" rx="10" ry="10" width="280" height="24" />
    <rect x="20" y="4" rx="120" ry="120" width="238" height="238" />
    <rect x="0" y="317" rx="10" ry="10" width="280" height="85" />
    <rect x="0" y="423" rx="10" ry="10" width="89" height="27" />
    <rect x="125" y="419" rx="25" ry="25" width="155" height="40" />
  </ContentLoader>
);

export default Preloader;
