import React, { Fragment } from 'react';
import { ml5, mt50 } from './TestExample.css';
import TestExampleSource from './TestExampleSource';

const TestExampleTag = (props) => {
  return (
    <span>
      { props.type === 'REACT' ? <span className={`badge badge-primary`}>React</span> : '' }
      { props.type === 'TESTING_LIBRARY' ? <span className={`badge badge-success`}>@testing/library</span> : '' }
      { props.type === 'JEST' ? <span className={`badge badge-warning`}>Jest</span> : '' }
      { props.type === 'ASYNC_RENDER' ? <span className={`badge badge-secondary`}>async-render-component</span> : '' }
    </span>
  );
};
const TestExampleCode = (props) => (
  <pre><code className={props.codeType}>{props.content}</code></pre>
);
const TestExample = (props) => (
  <div>
    <h4>{ props.title }</h4>
    <p>{ props.description }</p>
    <p>
      {
        props.tagList.length === 0 ? '' :
          props.tagList.map((tag, index)=>{
            return (
              <Fragment>
                { index === 0 ? '' : <span className={ml5}></span> }
                <TestExampleTag key={tag.type} {...tag}/>
              </Fragment>
            );
          })
      }
    </p>
    <div className="container">
      <div className="row">
        <div className="col"><TestExampleCode {...props.code}/></div>
        <div className="col" style={{padding:"10px", marginBottom:"1rem", backgroundColor:"#efefef"}}>
          <div dangerouslySetInnerHTML={ {__html: props.html} } />
          <div>{props.childComponent}</div>
        </div>
      </div>
    </div>
  </div>
);
const TestExampleList = () => {
  return (
    <div>
      {
        TestExampleSource.exampleList.length === 0 ? '' :
          TestExampleSource.exampleList.map(testExample=><Fragment><TestExample key={testExample.id} {...testExample}/><div className={mt50}></div></Fragment>)
      }
    </div>
  );
};
export default TestExampleList;