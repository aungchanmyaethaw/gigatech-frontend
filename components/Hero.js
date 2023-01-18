import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { motion } from "framer-motion";
const Hero = () => {
  return (
    <HeroStyled>
      <motion.div
        className="flex flex-col items-center gap-4 px-4 md:gap-8"
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: "tween", duration: 0.5 }}
      >
        <h1 className="text-2xl font-light text-light sm:text-3xl md:text-4xl lg:text-5xl">
          Giving Futures To Your Tech
        </h1>
        <p className="text-center text-light">
          GigaTech offers the world &apos;s leading brands of laptops, mobile
          phones,
          <br className="hidden lg:block" />
          desktops and more...
        </p>
        <Link href="/collections" className="text-sm md:text-base">
          Shop Now
        </Link>
      </motion.div>
    </HeroStyled>
  );
};

export default Hero;

const HeroStyled = styled.section`
  width: 100%;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
      rgba(18, 18, 18, 0.7),
      rgba(18, 18, 18, 0.8)
    ),
    url("/herobackground.jpg");
  background-position: center;
  background-size: cover;

  a {
    display: block;
    padding: 1em 2em;
    position: relative;
    overflow: hidden;
    color: var(--light);
    font-family: var(--font-heading);
    font-weight: 600;
    background-color: var(--primary);
    border-radius: 4px;
    z-index: 1;
    border: 2px solid var(--primary);
    &:before {
      content: "";
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      inset: 0;
      background-color: var(--dark-100);
      border-radius: 1rem;
      transform: scale(0);
      transition: transform 300ms ease-in;
      z-index: -1;
    }
    &:hover,
    &:active {
      &:before {
        transform: scale(1.5);
      }
    }
  }
`;
