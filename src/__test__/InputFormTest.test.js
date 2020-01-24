import React, { Component } from 'react';
import { render, fireEvent } from '@testing-library/react';

class DynamicChildComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [{itemName: 'child1'}]
    };
  }
  onClickAddItem = () => {
    const newItemList = this.state.itemList.concat({itemName: null});
    this.setState({itemList: newItemList});
  }
  onResetItemCount = () => {
    this.setState({itemList: [{itemName: 'child1'}]});
  }
  render () {
    return (
      <div>
        <button className={'btn btn-success'} style={{width: "100%", marginBottom: "7px"}} onClick={this.onClickAddItem}>+ 옵션추가</button>
        <button className={'btn btn-warning'} style={{width: "100%", marginBottom: "7px"}} onClick={this.onResetItemCount}>옵션리스트 초기화</button>
        <h5>옵션리스트</h5>
        { this.state.itemList.map(()=>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">옵션이름</span>
            </div>
            <input type="text" className="form-control" aria-label="Sizing example input option-name"
                   aria-describedby="inputGroup-sizing-default"
                   placeholder={"옵션이름을 입력해주세요."}
            />
          </div>
        ) }
      </div>
    );
  }
};

// describe('input 관련 테스트', () => {
//   it('타겟을 특정텍스트로 지정할 수 없는 경우 > aria-label을 사용한다', () => {
//     //given
//     const { getAllByLabelText, getByText } = render(<DynamicChildComponent />);
//     const $buttonAdd = getByText('+ 옵션추가');
//     //when
//     fireEvent.click($buttonAdd);
//     //then
//     expect(getAllByLabelText('option-name').length).toBe(2);
//   });
// });

export default DynamicChildComponent;