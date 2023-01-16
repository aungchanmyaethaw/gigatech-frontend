import React, { useState } from "react";
import { ContainerStyled } from "styles/global.styles";
import { UnderLine } from "styles/global.styles";
import LoginForm from "components/LoginForm";
import RegisterForm from "components/RegisterForm";
const auth = () => {
  const [currentTab, setCurrentTab] = useState("logIn");

  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  return (
    <ContainerStyled>
      {/* login */}
      <div className="flex justify-center mb-20 gap-x-20">
        <div className="flex flex-col items-center">
          <h2
            className="text-3xl lg:text-[40px] text-center font-normal capitalize cursor-pointer"
            onClick={() => handleTabChange("logIn")}
          >
            Login
          </h2>
          <UnderLine />
        </div>
        <div className="flex flex-col items-center">
          <h2
            className="text-3xl lg:text-[40px] text-center font-normal capitalize cursor-pointer"
            onClick={() => handleTabChange("register")}
          >
            Register
          </h2>
          <UnderLine />
        </div>
      </div>
      {currentTab === "logIn" ? <LoginForm /> : <RegisterForm />}
    </ContainerStyled>
  );
};

export default auth;
