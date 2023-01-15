import styled, { createGlobalStyle } from "styled-components";
export const ContainerStyled = styled.section`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 5rem 1rem;
  color: ${(props) => props.theme.textColor};
`;

export const UnderLine = styled.div`
  width: 6.75rem;
  height: 0.25rem;
  margin-top: 0.5em;
  background-color: var(--primary);
`;

export const lightTheme = {
  backgroundColor: "var(--light)",
  textColor: "var(--dark-200)",
};

export const darkTheme = {
  backgroundColor: "var(--dark-200)",
  textColor: "var(--light)",
};

export const GlobalStyles = createGlobalStyle`

body{

  background-color:${(props) => props.theme.backgroundColor}

}

`;
