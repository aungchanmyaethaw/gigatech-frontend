import React, { useState } from "react";
import styled from "styled-components";
import { useAppContext } from "contexts/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
const SearchBar = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) {
      handleSearchBarClose();
    } else {
      router.push(`/search?searchterm=${searchTerm.trim()}`);
      handleSearchBarClose();
    }
  };

  const { handleSearchBarClose } = useAppContext();

  return (
    <Backdrop
      key="backdrop"
      onClick={handleSearchBarClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <SearchBarContainer
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
      >
        <form onSubmit={handleSubmit}>
          <FieldSetStyled className="mb-16">
            <input
              type="text"
              id="search"
              placeholder=""
              className="text-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <label htmlFor="search">What do you need...?</label>
          </FieldSetStyled>
        </form>
      </SearchBarContainer>
    </Backdrop>
  );
};

export default SearchBar;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.backDropBackgroundColor};
  z-index: 100;
  opacity: 1;
`;

const SearchBarContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  width: 100%;
  min-height: 30vh;
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
`;

const FieldSetStyled = styled.div`
  width: 90%;
  margin: 3.5em auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  input {
    width: 100%;
    padding: 8px 0;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid var(--primary);

    &:not(focus),
    &:placeholder-shown {
      & + label {
        font-size: 1.5rem;
      }
    }

    &:focus,
    &:not(:placeholder-shown) {
      outline: none;
      & + label {
        font-size: 1rem;
        top: -1.25em;
        color: var(--primary);
      }
    }
  }
  label {
    position: absolute;
    top: 0.25em;
    left: 0;
    font-weight: 600;
    text-transform: capitalize;
    transition: top 200ms ease-in, font-size 200ms ease-in, color 200ms ease-in;
  }
`;
