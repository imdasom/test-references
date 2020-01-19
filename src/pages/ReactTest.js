import React from 'react';
import {Header} from 'semantic-ui-react';

import Layout from './Layout';
import TestExample from '../components/TestExample';

const ReactTest = () => {
  return (
    <Layout>
      <Header as="h2">Test React</Header>
      <TestExample/>
    </Layout>
  );
};

export default ReactTest;