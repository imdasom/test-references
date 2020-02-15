import React, { Component } from 'react';
import { render, fireEvent } from '@testing-library/react';

class SelectBoxTestComponent extends Component {
  render() {
    return (
      <div>
        <select>
          <option value="">색을 선택하세요</option>
          <option value="FFDCF7">#FFDCF7</option>
          <option value="FFB3B3">#FFB3B3</option>
          <option value="FCE2AE">#FCE2AE</option>
          <option value="B6FFEA">#B6FFEA</option>
        </select>
      </div>
    );
  }
}

// 테스트코드 regenerateRuntime 에러 나서 수정중

// describe('selectbox 테스트', () => {
//   it('select box 선택 테스트', async () => {
//     //given
//     const utils = render(<SelectBoxTestComponent/>);
//     const $selectbox = await utils.getByText('색을 선택하세요');
//     //when-then
//     fireEvent.click($selectbox);
//     const $selectboxPattern = await utils.getByText('#FFDCF7');
//     fireEvent.click($selectboxPattern);
//     utils.getByText('패턴');
//   });
// });
