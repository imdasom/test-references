import React from 'react';
import {Link} from 'react-router-dom';
import {Header, Container, Divider, Icon} from 'semantic-ui-react';

import {pullRight, h1} from './Layout.css';

const Layout = ({children}) => {
  return (
    <Container>
      <Link to="/">
        <Header as="h1" className={h1}>
          Test Frontend
        </Header>
      </Link>
      {children}
      <Divider/>
      <p className={pullRight} style={{marginBottom:"20px"}}>
        Made with <Icon name="heart" color="red"/> by Imdasom <Icon name="github"></Icon> <a href="https://github.com/imdasom/tdd">github</a>
      </p>
    </Container>
  );
};

export default Layout;