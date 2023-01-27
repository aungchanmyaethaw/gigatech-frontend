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
  selectBoxBorderColor: "var(--dark-200)",
  optionTextColor: "var(--dark-200)",
  backDropBackgroundColor: "rgba(253,253,253,0.3)",
  cardBackgroundColor: "rgba(0, 116, 228, 0.05)",
};

export const darkTheme = {
  backgroundColor: "var(--dark-200)",
  textColor: "var(--light)",
  selectBoxBorderColor: "var(--light)",
  selectBoxTextColor: "var(--dark-200)",
  optionTextColor: "var(--dark-200)",
  backDropBackgroundColor: "rgba(18,18,18,0.5)",
  cardBackgroundColor: "var(--dark-100)",
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

export const FieldSetStyled = styled.fieldset`
  max-width: 40rem;
  width: 100%;
  position: relative;
  input {
    width: 100%;
    padding: 2px 0;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid var(--primary);

    &:not(focus),
    &:placeholder-shown {
      & + label {
        font-size: 1rem;
      }
    }

    &:focus,
    &:not(:placeholder-shown) {
      outline: none;
      & + label {
        font-size: 0.75rem;
        top: -1.25rem;
        color: var(--primary);
      }
    }
  }
  label {
    position: absolute;
    top: -4px;
    left: 0;
    font-weight: 600;
    text-transform: uppercase;
    transition: top 200ms ease-in, font-size 200ms ease-in, color 200ms ease-in;
  }
`;
