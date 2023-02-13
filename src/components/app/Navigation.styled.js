import styled from "styled-components";

export const NavigationStyled = styled.nav`
  .navBar {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 0rem;
    font-size: 1.8rem;
    font-family: "'Roboto', 'Helvetica Neue', Helvetica, sans-serif";
  }
  
  .navBar li {
    list-style: none;
    margin-right: 2rem;
  }
  
  .navBar a {
    text-decoration: none;
  }
  
  .navBar a:hover {
    color: ${({ theme}) => theme.colors.onHoverFontColor01 };
  }
  
  a,
  a:focus,
  a:visited {
    color: ${({ theme}) => theme.colors.fontColor03 };;
    outline: none;
  }
`;