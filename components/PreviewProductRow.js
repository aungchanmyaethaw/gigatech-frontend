import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductCard from "components/ProductCard";
import { ContainerStyled, UnderLine } from "styles/global.styles";
import styled from "styled-components";
const PreviewProductRow = ({ products, heading, latest = false, link }) => {
  return (
    <ContainerStyled>
      <div className="flex flex-col items-center mb-20">
        <h2 className="text-3xl lg:text-[40px] text-center font-normal capitalize">
          {heading}
        </h2>
        <UnderLine />
      </div>

      <motion.div
        className="grid grid-cols-1 gap-8 md:gap-10 md:grid-cols-2 lg:grid-cols-4"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: "tween", duration: 0.5 }}
      >
        {products.map((product) => (
          <ProductCard
            {...product.attributes}
            id={product.id}
            key={product.attributes.slug}
            latest={latest}
          />
        ))}
      </motion.div>

      <ButtonContainer
        className="flex justify-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "tween", duration: 0.7 }}
      >
        <Link href={link}>Explore More</Link>
      </ButtonContainer>
    </ContainerStyled>
  );
};

export default PreviewProductRow;

const ButtonContainer = styled(motion.div)`
  a {
    display: block;
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
  }
`;
