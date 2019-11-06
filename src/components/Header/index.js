import React from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/logo.png';
import { Container, Content } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Dungeons and Dragons" />
          <Link to="/characters">Dungeons and Dragons</Link>
        </nav>
      </Content>
    </Container>
  );
}
