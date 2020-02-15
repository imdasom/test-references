import React from 'react';
import {Link} from 'react-router-dom';
import {Header, Container, Divider, Icon} from 'semantic-ui-react';

import {pullRight, h1} from './Layout.css';

const Layout = ({children}) => {
  return (
    <Container>
      <Link to="/">
        <h1 as="h1" className={h1}>
          Frontend Testcase
        </h1>
      </Link>
      {/*<Link to="/back">*/}
      {/*  <Header as="h1" className={h1}>*/}
      {/*    Spring Spock Junit Groovy*/}
      {/*  </Header>*/}
      {/*</Link>*/}
      {children}
      <Divider/>
      <p className={pullRight} style={{marginBottom:"20px"}}>
        Release Date 2020-02-15 / Made with <Icon name="heart" color="red"/> by Imdasom <Icon name="github"></Icon> <a href="https://github.com/imdasom/tdd" target="_blank">github</a>
      </p>
    </Container>
  );
};

export default Layout;