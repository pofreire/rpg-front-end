import styled from 'styled-components';

export const Container = styled.div`
  padding: 0;
`;

export const Content = styled.div`
  height: 100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
      height: 40px;
    }

    a {
      font-weight: bold;
      color: #fff;
      font-size: 18px;
      text-decoration: none;
    }
  }
`;
