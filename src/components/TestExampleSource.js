import React, { Component } from 'react';

let id = 1;
const TestExampleSource = {
  exampleList: [
    {
      id: id,
      title: "알럿 테스트 > 옵션 5개 이상 만들면 알럿이 떠야 한다",
      tagList: [{type: "REACT", title: "React"}, {type: "TESTING_LIBRARY", title: "@testing/library"}, {type: "JEST", title: "Jest"}],
      code: {codeType: "javascript", content: `it('알럿 테스트 > 옵션 5개 이상 만들면 알럿이 떠야 한다', () => {
  const mockAlert = jest.fn();
  window.alert = mockAlert;
  const utils = render(<DynamicChildContainer/>);
  const $addItemButton = utils.getByText('+ Add Item');
  fireEvent.click($addItemButton);
  fireEvent.click($addItemButton);
  fireEvent.click($addItemButton);
  fireEvent.click($addItemButton);
  fireEvent.click($addItemButton);
  fireEvent.click($addItemButton);
  expect(mockAlert).toBeCalledTimes(1);
  expect(mockAlert).toBeCalledWith('max item count: 5');
});`},
      childComponent: (()=>{
        class AlertTest extends Component {
          constructor(props) {
            super(props);
            this.state = {
              count: 0
            };
          }
          onClickAddItem = () => {
            if(this.state.count === 5) {
              alert('max item count: 5');
              return;
            }
            this.setState({count: this.state.count+=1});
          }
          onResetItemCount = () => {
            this.setState({count: 0});
          }
          render () {
            return (
              <div>
                <button className={'btn btn-success'} onClick={this.onClickAddItem}>+ Add Item</button>
                <button className={'btn btn-warning'} onClick={this.onResetItemCount}>Reset Item Count</button>
                <h3>item count</h3>
                <h1>{this.state.count}</h1>
              </div>
            );
          }
        }
        return (
          <div><AlertTest /></div>
        );
      })()
      ,
    },
    {
      id: id+=1
      , title: "원하는 문자가 화면에 존재하는지 테스트"
      , tagList: [{type: "REACT", title: "React"}, {type: "TESTING_LIBRARY", title: "@testing/library"}, {type: "JEST", title: "Jest"}]
      , code: {codeType: "javascript", content: `it('화면에 Create Palette문자열이 있어야 한다', () => {
  import { render, waitForElement } from '@testing-library/react';
  const { getByText } = render(getComponentWithSuspense());
  const lazyElement = await waitForElement(() => getByText('Create Palette'));
  expect(lazyElement).toBeInTheDocument();
});`}
      , html: `<span>Create Palette</span>`,
    }
    , {
      id: id+=1
      , title: "비동기 렌더링 컴포넌트 가져오는 boilerplate 함수"
      , tagList: [{type: "REACT", title: "React"}, {type: "ASYNC_RENDER", title: "async-render"}]
      , code: {codeType: "javascript", content: "const getComponentWithSuspense = function() {\n  return (\n    <MemoryRouter>\n      <Suspense fallback={<div>Loading PaletteCreate...</div>}>\n        <PaletteCreate />\n      </Suspense>\n    </MemoryRouter>\n  );\n};"}
    }
  ]
};
export default TestExampleSource;