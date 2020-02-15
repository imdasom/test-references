import React from 'react';

import Layout from './Layout';
import TestExampleList from '../components/TestExampleList.jsx';

const href = {
  marginLeft: "10px",
};

const referenceLink = {
  marginBottom: "40px",
};

const ReactTest = () => {
  return (
    <Layout>
      <div style={referenceLink}>
        <a href="https://github.com/imdasom/tdd/issues" target="_blank"># 그 밖의 테스트케이스 보기</a>
        <a href="https://devhints.io/jest" target="_blank" style={href}># Jest Cheatsheet</a>
        <a href="https://testing-library.com/docs/intro" target="_blank" style={href}># @testing-library</a>
      </div>
      <TestExampleList />
    </Layout>
  );
};

export default ReactTest;
