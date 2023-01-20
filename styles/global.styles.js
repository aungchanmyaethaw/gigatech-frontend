import styled, { createGlobalStyle } from "styled-components";
export const ContainerStyled = styled.section`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 5rem 1rem;
  color: ${(props) => props.theme.textColor};
  overflow-x: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
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

export const Button = styled.button`
  padding: 0.75em 1.5em;
  position: relative;
  overflow: hidden;
  color: var(--primary);
  font-family: var(--font-heading);
  font-weight: 600;
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 4px;
  z-index: 1;
  transition: color 300ms ease-in;
  border: 2px solid var(--primary);
  &:before {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    inset: 0;
    background-color: var(--primary);
    border-radius: 0.75rem;
    transform: scale(0);
    transition: transform 300ms ease-in;
    z-index: -1;
  }
  &:not(:disabled):hover,
  &:not(:disabled):active {
    color: var(--light);
    &:before {
      transform: scale(1.5);
    }
  }
`;
