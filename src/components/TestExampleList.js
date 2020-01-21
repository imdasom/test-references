import React from 'react';
import { ml5, mt50 } from './TestExample.css';
import TestExampleSource from './TestExampleSource';

const TestExampleTag = () => {
  return (
    <Fragment>
      { this.props.type === 'REACT' ? <span className={`badge badge-primary`}>React</span> : '' }
      { this.props.type === 'TESTING_LIBRARY' ? <span className={`badge badge-success`}>@testing/library</span> : '' }
      { this.props.type === 'JEST' ? <span className={`badge badge-warning`}>Jest</span> : '' }
      { this.props.type === 'ASYNC_RENDER' ? <span className={`badge badge-secondary`}>async-render-component</span> : '' }
    </Fragment>
  );
};
const TestExampleCode = () => {
  return (
    <pre><code className={this.props.codeType}>{this.props.content}</code></pre>
  );
};
const TestExample = () => {
  return (
    <div>
      <div>
        <h4>{ TestExampleSource.exampleList[0].title }</h4>
        <p>
          {
            TestExampleSource.exampleList[0].tagList.length === 0 ? '' :
            TestExampleSource.exampleList[0].tagList.map(tag=><TestExampleTag {...tag}/>).join(<span className={ml5}></span>)
          }
        </p>
        <TestExampleCode {...TestExampleSource.exampleList[0].code}/>
      </div>
      <div className={mt50}></div>
      <div>
        <h4>비동기 렌더링 컴포넌트 가져오는 boilerplate 함수</h4>
        <p>

        </p>
        <pre><code className={'javascript'}>{`const getComponentWithSuspense = function() {
  return (
    <MemoryRouter>
      <Suspense fallback={<div>Loading PaletteCreate...</div>}>
        <PaletteCreate />
      </Suspense>
    </MemoryRouter>
  );
};`}
      </code></pre>
      </div>
      <div className={mt50}></div>
    </div>
  );
};

export default TestExample;