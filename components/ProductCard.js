import React from "react";
import { BsHeart, BsEye } from "react-icons/bs";
import styled from "styled-components";
import { motion } from "framer-motion";
import { currencyFormatter } from "utils";

const OverLayVariants = {
  initial: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const ImageVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: "linear",
    },
  },
};

const ProductCard = ({ name, brand, price, images }) => {
  return (
    <article>
      <ImageContainer initial="initial" whileHover="hover">
        <motion.img
          src={images.data[0].attributes.formats.small.url}
          className="rounded"
          variants={ImageVariants}
        />
        <motion.div variants={OverLayVariants}>
          <ButtonGroup>
            <button>
              <BsHeart color="#212121" />
            </button>
            <button>
              <BsEye color="#212121" />
            </button>
          </ButtonGroup>
        </motion.div>
      </ImageContainer>
      <div className="flex flex-col gap-2 mt-8">
        <h6 className="font-bold uppercase ">{brand}</h6>
        <span className="text-base  line-clamp-2 text-ellipsis`">{name}</span>
        <span className="text-base font-semibold text-primary">
          {currencyFormatter.format(price)}
        </span>
      </div>
    </article>
  );
};

export default ProductCard;

const ImageContainer = styled(motion.div)`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  & > div {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: end;
    align-items: end;
    padding: 1em;
    background-color: rgba(18, 18, 18, 0.2);
    border-radius: 4px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;

  button {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--light);
    border-radius: 100%;
  }
`;
