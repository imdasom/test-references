import React, { Component } from 'react';
import DynamicChildComponent from '../__test__/InputFormTest.test';

let id = 1;
const TestExampleSource = {
  exampleList: [
    {
      id: id,
      created: "20200125",
      title: "mock api 테스트 > /api/palette/1 데이터가 렌더링 되어야 한다",
      description: "axios에서 제공하는 mock api를 활용한다. 특정 api reqeust에 대한 response를 지정할 수 있다.",
      tagList: [{type: "REACT", title: "React"}, {type: "TESTING_LIBRARY", title: "@testing/library"}, {type: "JEST", title: "Jest"}, {type: "AXIOS", title: "axios"}],
      codeList: [
        {
          codeType: "javascript",
          content: `it('mock api 테스트 > /api/palette/1 데이터가 렌더링 되어야 한다', async () => {
  //given
  const { getByText } = render(getComponentWithSuspense());
  //when
  const textElements = await waitForElement(() => [
    getByText('#FFDCF7'),
    getByText('#FFB3B3'),
    getByText('#FCE2AE'),
    getByText('#B6FFEA'),
    getByText('2019/7/11'),
    getByText('0'),
  ]);
  //then
  textElements.forEach((textElement) => {
    expect(textElement).toBeInTheDocument();
  });
});`
        },
        {
          codeType: "javascript", content: `// componet import
import React, { Suspense } from 'react';
import { PaletteInfo } from 'pages';
// test library import
import { render, wait, waitForElement, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';`
        },
        {
          codeType: "javascript", content: `// PaletteInfo 내부에서 /api/palette/1 API를 호출한다
const TEST_TARGET_ID = 1;
const getComponentWithSuspense = function() {
  return (
    <MemoryRouter>
      <Suspense fallback={<div>Loading PaletteInfo...</div>}>
        <PaletteInfo
          match={{params:{id:TEST_TARGET_ID}}}
        />
      </Suspense>
    </MemoryRouter>
  );
};`
        },
        {
          codeType: "javascript",
          content: `// Mock API를 세팅한다. PaletteInfo 컴포넌트 내부에서는 Mock API가 호출된다.
const apiHost = process.env.REACT_APP_API_HOST;
const mock = new MockAdapter(axios, { deplayResponse: 200 }); // 200ms 가짜 딜레이 설정
mock.onGet(apiHost + '/api/palettes/1').reply(200, {
  "items": [
    { "type": "COLOR", "content": { "hex": "ffdcf7" } },
    { "type": "COLOR", "content": { "hex": "ffb3b3" } },
    { "type": "COLOR", "content": { "hex": "fce2ae" } },
    { "type": "COLOR", "content": { "hex": "b6ffea" } }
  ],
  "id": 1,
  "like": 0,
  "created": 1565515134979
});`
        }
      ],
      childComponent: (()=>{
        return (
          <div>
            <div><h5><strong>Color Palette 1</strong></h5></div>
            <div style={{width:"100%", height:"25px", marginTop:"10px"}}>
              <div style={{textAlign:"left", alignContent:"center", width:"inherit", position:"absolute"}}>
                <p style={{width:"100%"}}><strong>Liked</strong> 0</p>
              </div>
            </div>
            <div style={{width:"100%", height:"25px"}}>
              <div style={{textAlign:"left", alignContent:"center", width:"inherit", position:"absolute"}}>
                <p style={{width:"100%"}}><strong>Created</strong> 2019/7/11</p>
              </div>
            </div>
            <div style={{backgroundColor: "#ffdcf7", textAlign:"right", alignContent:"center", width:"100%", height: "50px"}}><p style={{width:"100%"}}>#FFDCF7</p></div>
            <div style={{backgroundColor: "#ffb3b3", textAlign:"right", alignContent:"center", width:"100%", height: "50px"}}><p style={{width:"100%"}}>#FFB3B3</p></div>
            <div style={{backgroundColor: "#fce2ae", textAlign:"right", alignContent:"center", width:"100%", height: "50px"}}><p style={{width:"100%"}}>#FCE2AE</p></div>
            <div style={{backgroundColor: "#b6ffea", textAlign:"right", alignContent:"center", width:"100%", height: "50px"}}><p style={{width:"100%"}}>#B6FFEA</p></div>
          </div>
        );
      })(),
    },
    {
      id: id+=1,
      created: "20200125",
      title: "알럿 테스트 > 옵션 5개 이상 만들면 알럿이 떠야 한다",
      description: "jest에서 제공하는 목함수를 이용한다. window.alert 함수를 spying 하는 것처럼 테스트 할 수 있다.",
      tagList: [{type: "REACT", title: "React"}, {type: "TESTING_LIBRARY", title: "@testing/library"}, {type: "JEST", title: "Jest"}],
      codeList: [
        {
          codeType: "javascript",
          content: `it('알럿 테스트 > 옵션 5개 이상 만들면 알럿이 떠야 한다', () => {
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
});`
        },
      ],
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
      })(),
    },
    {
      id: id+=1,
      created: "20200125",
      title: "타겟을 특정텍스트로 지정할 수 없는 경우 > aria-label을 사용한다",
      description: `<input>, <form> 태그와 같이 visible한 값으로 타겟을 가져올 수 없는 경우에는 aria-label 속성을 주면 된다.`,
      tagList: [{type: "REACT", title: "React"}, {type: "TESTING_LIBRARY", title: "@testing/library"}, {type: "JEST", title: "Jest"}],
      codeList: [
        {
          codeType: "javascript",
          content: `it('타겟을 특정텍스트로 지정할 수 없는 경우 > aria-label을 사용한다', () => {
  //given
  const { getAllByLabelText, getByText } = render(<DynamicChildComponent />);
  const $buttonAdd = getByText('+ 옵션추가');
  //when
  fireEvent.click($buttonAdd);
  //then
  expect(getAllByLabelText('option-name').length).toBe(2);
});`
        },
      ],
      childComponent: (
        <div><DynamicChildComponent /></div>
      ),
    },
    {
      id: id+=1,
      created: "20200125",
      title: "style 테스트 > backgroundColor 테스트",
      description: "getBy*는 HTMLElement를 리턴하므로 style 속성을 가져와 assert할 수 있다.",
      tagList: [{type: "REACT", title: "React"}, {type: "TESTING_LIBRARY", title: "@testing/library"}, {type: "JEST", title: "Jest"}],
      codeList: [{codeType: "javascript", content: `it('style 테스트 > backgroundColor 테스트', async () => {
  //given    
  const { container, getByTestId } = render(getComponentWithSuspense());
  await wait();
  const $colorItem3 = getByTestId('ColorItem3');
  const $redColor = container.querySelector('div[title="#D0021B"]');
  //when
  fireEvent.click($colorItem3);
  fireEvent.click($redColor);
  //then
  expect($colorItem3.style.backgroundColor).toBe('rgb(208, 2, 27)');
});`}],
      childComponent: (()=>{
        return (
          <div><div style={{backgroundColor: "rgb(208, 2, 27)", width: "100px", height: "100px"}}></div></div>
        );
      })()
      ,
    },
    {
      id: id+=1,
      created: "20200125",
      title: "화면 진입 시 디폴트값 체크하고 싶은 경우",
      description: "사용자가 화면에 진입하였을 때 렌더링 되는 디폴트UI를 테스트하려는 경우. 간단하게 waitForElement에 배열형태로 디폴트값들을 입력한다.",
      tagList: [{type: "REACT", title: "React"}, {type: "TESTING_LIBRARY", title: "@testing/library"}, {type: "JEST", title: "Jest"}],
      codeList: [
        {
          codeType: "javascript",
          content: `it('디폴트값 렌더링 테스트 > paletteItem 4개가 있어야 한다', async () => {,
  //given
  const { getByText } = render(getComponentWithSuspense());
  //when
  const textElements = await waitForElement(() => [
    getByText('Create Palette'),
    getByText('#AAAAAA'),
    getByText('#BBBBBB'),
    getByText('#CCCCCC'),
    getByText('#DDDDDD')
  ]);
  //then
  textElements.forEach((textElement) => {
    expect(textElement).toBeInTheDocument();
  });
});`
        }
      ],
      childComponent: (()=>{
        const toHex = (num16) => {
          num16 = parseInt( num16, 10 ).toString( 16 );
          num16 = ( num16.length === 1 ) ? "0" + num16 : num16;
          return num16;
        };
        const getRandomColor = () => {
          const r = toHex(Math.floor(Math.random() * (+255 - +0)) + +0);
          const g = toHex(Math.floor(Math.random() * (+255 - +0)) + +0);
          const b = toHex(Math.floor(Math.random() * (+255 - +0)) + +0);
          return `#${r}${g}${b}`;
        };
        return (
          <div>
            <div><h5>Create Palette</h5></div>
            <div style={{marginBottom:"20px"}}>You can paint color by click each item!</div>
            <div onClick={(e)=>{ const newColor = getRandomColor(); e.currentTarget.style.backgroundColor = newColor; e.currentTarget.firstChild.innerHTML = newColor.toUpperCase(); }} style={{backgroundColor: "#AAAAAA", textAlign:"right", alignContent:"center", width:"100%", height: "50px"}}><p style={{width:"100%"}}>#AAAAAA</p></div>
            <div onClick={(e)=>{ const newColor = getRandomColor(); e.currentTarget.style.backgroundColor = newColor; e.currentTarget.firstChild.innerHTML = newColor.toUpperCase(); }} style={{backgroundColor: "#BBBBBB", textAlign:"right", alignContent:"center", width:"100%", height: "50px"}}><p style={{width:"100%"}}>#BBBBBB</p></div>
            <div onClick={(e)=>{ const newColor = getRandomColor(); e.currentTarget.style.backgroundColor = newColor; e.currentTarget.firstChild.innerHTML = newColor.toUpperCase(); }} style={{backgroundColor: "#CCCCCC", textAlign:"right", alignContent:"center", width:"100%", height: "50px"}}><p style={{width:"100%"}}>#CCCCCC</p></div>
            <div onClick={(e)=>{ const newColor = getRandomColor(); e.currentTarget.style.backgroundColor = newColor; e.currentTarget.firstChild.innerHTML = newColor.toUpperCase(); }} style={{backgroundColor: "#DDDDDD", textAlign:"right", alignContent:"center", width:"100%", height: "50px"}}><p style={{width:"100%"}}>#DDDDDD</p></div>
          </div>
        );
      })(),
    },
    {
      id: id+=1,
      created: "20200125",
      title: "원하는 문자가 화면에 존재하는지 테스트",
      tagList: [{type: "REACT", title: "React"}, {type: "TESTING_LIBRARY", title: "@testing/library"}, {type: "JEST", title: "Jest"}],
      codeList: [
        {codeType: "javascript", content: `it('화면에 Create Palette문자열이 있어야 한다', async () => {,
  //given
  import { render, waitForElement } from '@testing-library/react';
  const { getByText } = render(getComponentWithSuspense());
  //when
  const lazyElement = await waitForElement(() => getByText('Create Palette'));
  //then
  expect(lazyElement).toBeInTheDocument();
});`
        }
      ],
      html: `<h3>Create Palette</h3>`,
    },
    {
      id: id+=1,
      created: "20200125",
      title: "비동기 렌더링 컴포넌트 가져오는 boilerplate 함수",
      description: "lazy rendering 컴포넌트의 경우에는 render()를 사용할 수 없다. 다음과 같이 Suspense를 활용해야 한다. 더불어 Link와 같이 라우팅로직을 포함하는 컴포넌트의 경우 MemoryRouter로 컴포넌트를 감싸주어야 원하는 결과를 얻을 수 있다.",
      tagList: [{type: "REACT", title: "React"}, {type: "ASYNC_RENDER", title: "async-render"}],
      codeList: [
        {
          codeType: "javascript",
          content: `import React, { Suspense } from 'react';
import { MemoryRouter } from 'react-router-dom';
const getComponentWithSuspense = function() {
  return (
    <MemoryRouter>
      <Suspense fallback={<div>Loading PaletteCreate...</div>}>
        <PaletteCreate />
      </Suspense>
    </MemoryRouter>
  );
};`
        }
      ],
    },
  ],
};
export default TestExampleSource;