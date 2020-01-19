import React from 'react';
import {Link} from 'react-router-dom';

import Layout from './Layout';

const Home = () => {
  return (
    <Layout>
      <p>Hello World of Test Examples!</p>
      <p>
        <Link to="/react">React Test Reference</Link>
      </p>
    </Layout>
  );
};

export default Home;