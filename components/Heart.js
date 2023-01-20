import React, { useState } from "react";
import { useAppContext } from "contexts/AppContext";
import styled from "styled-components";
export const Heart = () => {
  const { theme } = useAppContext();

  return (
    <WishListBtn className="flex items-center justify-center w-12 text-xl bg-transparent border-2 rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        className="w-8 h-8 hover:cursor-pointer"
        fill="transparent"
        stroke={`${theme === "light" ? "#202020" : "#fdfdfd"}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </WishListBtn>
  );
};

export default Heart;

const WishListBtn = styled.div`
  border-color: ${(props) => props.theme.textColor};
`;
