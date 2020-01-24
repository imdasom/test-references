import React, { Component } from 'react';
import DynamicChildComponent from '../__test__/InputFormTest.test';

let id = 1;
const TestExampleSource = {
  exampleList: [
    {
      id: id,
      title: "알럿 테스트 > 옵션 5개 이상 만들면 알럿이 떠야 한다",
      tagList: [{type: "REACT", title: "React"}, {type: "TESTING_LIBRARY", title: "@testing/library"}, {type: "JEST", title: "Jest"}],
      code: {codeType: "javascript", content: `it('알럿 테스트 > 옵션 5개 이상 만들면 알럿이 떠야 한다', () => {
  //given
  const mockAlert = jest.fn();
  window.alert = mockAlert;
  const utils = render(<DynamicChildContainer/>);
  const $addItemButton = utils.getByText('+ 옵션추가');
  //when
  fireEvent.click($addItemButton);
  fireEvent.click($addItemButton);
  fireEvent.click($addItemButton);
  fireEvent.click($addItemButton);
  fireEvent.click($addItemButton);
  fireEvent.click($addItemButton);
  //then
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
                <button className={'btn btn-success'} style={{width: "100%", marginBottom: "7px"}} onClick={this.onClickAddItem}>+ 옵션추가</button>
                <button className={'btn btn-warning'} style={{width: "100%", marginBottom: "7px"}} onClick={this.onResetItemCount}>초기화</button>
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
      id: id+=1,
      title: "타겟을 특정텍스트로 지정할 수 없는 경우 > aria-label을 사용한다",
      description: "<input>, <form> 태그와 같이 visible한 값으로 타겟을 가져올 수 없는 경우에는 aria-label 속성을 주면 된다.",
      tagList: [{type: "REACT", title: "React"}, {type: "TESTING_LIBRARY", title: "@testing/library"}, {type: "JEST", title: "Jest"}],
      code: {codeType: "javascript", content: `it('타겟을 특정텍스트로 지정할 수 없는 경우 > aria-label을 사용한다', () => {
  //given
  const { getByLabel, getByText } = render(<DynamicChildComponent />);
  const $buttonAdd = getByText('+ 옵션추가');
  //when
  fireEvent.click($buttonAdd);
  //then
  expect(getByLabel('option-name').length).toBe(2);
});`},
      childComponent: (()=>{
        return (
          <div><DynamicChildComponent /></div>
        );
      })()
      ,
    },
    {
      id: id+=1,
      title: "style 테스트 > backgroundColor 테스트",
      tagList: [{type: "REACT", title: "React"}, {type: "TESTING_LIBRARY", title: "@testing/library"}, {type: "JEST", title: "Jest"}],
      code: {codeType: "javascript", content: `it('style 테스트 > backgroundColor 테스트', async () => {
  //given    
  const { container, getByTestId } = render(getComponentWithSuspense());
  await wait();
  const $colorItem3 = getByTestId('ColorItem3');
  const $redColor = container.querySelector('div[title="#D0021B"]');
  //wehn
  fireEvent.click($colorItem3);
  fireEvent.click($redColor);
  //then
  expect($colorItem3.style.backgroundColor).toBe('rgb(208, 2, 27)');
});`},
      childComponent: (()=>{
        return (
          <div><div style={{backgroundColor: "rgb(208, 2, 27)", width: "100px", height: "100px"}}></div></div>
        );
      })()
      ,
    },
    {
      id: id+=1
      , title: "원하는 문자가 화면에 존재하는지 테스트"
      , tagList: [{type: "REACT", title: "React"}, {type: "TESTING_LIBRARY", title: "@testing/library"}, {type: "JEST", title: "Jest"}]
      , code: {codeType: "javascript", content: `it('화면에 Create Palette문자열이 있어야 한다', () => {
  //given
  import { render, waitForElement } from '@testing-library/react';
  const { getByText } = render(getComponentWithSuspense());
  //when
  const lazyElement = await waitForElement(() => getByText('Create Palette'));
  //then
  expect(lazyElement).toBeInTheDocument();
});`}
      , html: `<h3>Create Palette</h3>`,
    },
    {
      id: id+=1
      , title: "비동기 렌더링 컴포넌트 가져오는 boilerplate 함수"
      , tagList: [{type: "REACT", title: "React"}, {type: "ASYNC_RENDER", title: "async-render"}]
      , code: {codeType: "javascript", content: `const getComponentWithSuspense = function() {
  return (
    <MemoryRouter>
      <Suspense fallback={<div>Loading PaletteCreate...</div>}>
        <PaletteCreate />
      </Suspense>
    </MemoryRouter>
  );
};`}
    }
  ]
};
export default TestExampleSource;