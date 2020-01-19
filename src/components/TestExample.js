import React from 'react';
import {ml5, mt50} from './TestExample.css';

const TestExample = () => {
  return (
    <div>
      <div>
        <h4>원하는 문자가 화면에 존재하는지 테스트</h4>
        <p>
          <span className={`badge badge-primary`}>React</span>
          <span className={`badge badge-success ${ml5}`}>@testing/library</span>
          <span className={`badge badge-warning ${ml5}`}>Jest</span>
        </p>
        <pre><code className={'javascript'}>{`import { render, waitForElement } from '@testing-library/react';
const { getByText } = render(getComponentWithSuspense());
const lazyElement = await waitForElement(() => getByText('Create Palette'));
expect(lazyElement).toBeInTheDocument();`}
        </code></pre>
      </div>
      <div className={mt50}></div>
      <div>
        <h4>비동기 렌더링 컴포넌트 가져오는 boilerplate 함수</h4>
        <p>
          <span className={`badge badge-primary`}>React</span>
          <span className={`badge badge-secondary ${ml5}`}>async-rend-component</span>
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
    </div>
  );
};

export default TestExample;