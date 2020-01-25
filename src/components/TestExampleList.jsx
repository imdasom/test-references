import React, { Fragment } from 'react';
import { ml5, mt50, lightBadge, badgeLightgray, exampleContainer, exampleContainerCol } from './TestExample.css';
import TestExampleSource from './TestExampleSource';

const TestExampleTag = (props) => {
  return (
    <span>
      { props.type === 'REACT'            ? <span className={`badge badge-primary ${lightBadge}`}>{props.title}</span> : '' }
      { props.type === 'TESTING_LIBRARY'  ? <span className={`badge badge-success ${lightBadge}`}>{props.title}</span> : '' }
      { props.type === 'JEST'             ? <span className={`badge badge-warning ${lightBadge}`}>{props.title}</span> : '' }
      { props.type === 'ASYNC_RENDER'     ? <span className={`badge badge-secondary ${lightBadge}`}>{props.title}</span> : '' }
      { props.type === 'AXIOS'            ? <span className={`badge badge-info ${lightBadge}`}>{props.title}</span> : '' }
    </span>
  );
};
const TestExampleCode = (props) => (
  <pre style={{marginBottom:"1px"}}><code className={props.codeType}>{props.content}</code></pre>
);
const TestExample = (props) => (
  <div>
    <h4>{ props.title }</h4>
    <p>{ props.description }</p>
    <p>
      <span className={`badge ${badgeLightgray} ${lightBadge}`}>{props.created}</span>
      {
        props.tagList.length === 0 ? '' :
          props.tagList.map((tag)=>{
            return (
              <Fragment>
                <span className={ml5}></span>
                <TestExampleTag key={tag.type} {...tag}/>
              </Fragment>
            );
          })
      }
    </p>
    <div className={`container ${exampleContainer}`}>
      <div className="row">
        <div className={`col ${exampleContainerCol}`}>
          { props.codeList.length === 0 ? '' : props.codeList.map(code=><TestExampleCode {...code}/>) }
        </div>
        <div className="col" style={{padding:"10px", marginBottom:"1px", backgroundColor:"#efefef"}}>
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
          TestExampleSource.exampleList.map(testExample=><Fragment key={testExample.id}><TestExample {...testExample}/><div className={mt50}></div></Fragment>)
      }
    </div>
  );
};
export default TestExampleList;