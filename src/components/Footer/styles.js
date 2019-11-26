import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
`;

export const Content = styled.div`
  height: 40px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #6c757d;

  a {
    color: #6c757d;
    :hover {
      color: #ff5555;
      text-decoration: none;
    }
  }
`;
