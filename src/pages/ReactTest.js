import React from 'react';
import {Header} from 'semantic-ui-react';

import Layout from './Layout';
import TestExampleList from '../components/TestExampleList.jsx';

const ReactTest = () => {
  return (
    <Layout>
      <Header as="h2">React</Header>
      <TestExampleList />
    </Layout>
  );
};

export default ReactTest;
