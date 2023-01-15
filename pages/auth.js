import React, { useState } from "react";
import styled from "styled-components";
import { ContainerStyled } from "styles/global.styles";
import { UnderLine } from "styles/global.styles";
import { motion } from "framer-motion";
const auth = () => {
  const [currentTab, setCurrentTab] = useState("logIn");
  const [logInUserData, setLogInUserData] = useState({
    email: "",
    password: "",
  });
  const [registerUserData, setRegisterUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleTabChange = () => {
    const newTab = currentTab === "logIn" ? "register" : "logIn";
    setCurrentTab((prev) => (prev === "logIn" ? "register" : "logIn"));
    if (newTab === "logIn") {
      setRegisterUserData({ username: "", email: "", password: "" });
    } else {
      setLogInUserData({ email: "", password: "" });
    }
  };

  const handleInputChange = (key, value) => {
    if (currentTab === "logIn") {
      setLogInUserData((prev) => {
        return { ...prev, [key]: value };
      });
    } else {
      setRegisterUserData((prev) => {
        return { ...prev, [key]: value };
      });
    }
  };

  return (
    <ContainerStyled>
      {/* login */}
      <div className="flex justify-center mb-20 gap-x-20">
        <div className="flex flex-col items-center">
          <h2
            className="text-3xl lg:text-[40px] text-center font-normal capitalize cursor-pointer"
            onClick={handleTabChange}
          >
            Login
          </h2>
          <UnderLine />
        </div>
        <div className="flex flex-col items-center ">
          <h2
            className="text-3xl lg:text-[40px] text-center font-normal capitalize cursor-pointer"
            onClick={handleTabChange}
          >
            Register
          </h2>
          <UnderLine />
        </div>
      </div>
      {currentTab === "logIn" ? (
        <form className="flex flex-col items-center">
          <FieldSetStyled>
            <input type="email" id="email" placeholder="" />
            <label htmlFor="email">Email</label>
          </FieldSetStyled>
          {/* <fieldset>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </fieldset> */}
          <Button>Log In</Button>
        </form>
      ) : (
        <form></form>
      )}
      {/* {register} */}
    </ContainerStyled>
  );
};

export default auth;

const FieldSetStyled = styled.fieldset`
  max-width: 40rem;
  width: 100%;
  position: relative;
  input {
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid var(--primary);
    &:focus {
      outline: none;
    }
  }
  label {
    position: absolute;
    top: 0;
    left: 0;
    font-weight: 500;
    text-transform: uppercase;
    font-family: var(--font-heading);
  }
`;

const Button = styled.button`
  margin-top: 4rem;
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
  &:hover,
  &:active {
    color: var(--light);
    &:before {
      transform: scale(1.5);
    }
  }
`;
