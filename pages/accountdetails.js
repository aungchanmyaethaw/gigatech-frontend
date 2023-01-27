import React, { useState } from "react";
import { ContainerStyled, UnderLine } from "styles/global.styles";
import Details from "components/Details";
import ChangePassword from "components/ChangePassword";
const AccountDetails = () => {
  const [currentTab, setCurrentTab] = useState("details");

  const handleTabChange = (value) => {
    setCurrentTab(value);
  };

  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20 ">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize ">
          My Account
        </h2>
        <UnderLine />
      </div>
      <div className="flex items-center justify-center mb-20 gap-x-20">
        <div className="flex flex-col items-center">
          <h2
            className={`text-3xl lg:text-[40px] text-center font-normal capitalize cursor-pointer  ${
              currentTab !== "details" ? " text-primary opacity-50" : ""
            }`}
            onClick={() => handleTabChange("details")}
          >
            Details
          </h2>

          {currentTab === "details" && <UnderLine className="!w-3/4" />}
        </div>
        <div className="flex flex-col items-center">
          <h2
            className={`text-3xl lg:text-[40px] text-center font-normal capitalize cursor-pointer ${
              currentTab !== "changePassword" ? " text-primary opacity-50" : ""
            }`}
            onClick={() => handleTabChange("changePassword")}
          >
            Password
          </h2>

          {currentTab !== "details" && <UnderLine />}
        </div>
      </div>
      {currentTab === "details" ? <Details /> : <ChangePassword />}
    </ContainerStyled>
  );
};

export default AccountDetails;
