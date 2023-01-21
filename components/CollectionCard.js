import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styled from "styled-components";
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

const CollectionCard = ({ name, slug, image }) => {
  return (
    <article>
      <Link href={`/collections/${slug}?sort=createdAt:desc`}>
        <ImageContainer initial="initial" whileHover="hover">
          <motion.img
            src={image.data.attributes.formats.small.url}
            className="rounded"
            variants={ImageVariants}
          />
          <motion.div variants={OverLayVariants}>
            <h4 className="text-2xl font-base text-light">{name}</h4>
          </motion.div>
        </ImageContainer>
      </Link>
    </article>
  );
};

export default CollectionCard;

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
    justify-content: center;
    align-items: center;
    background-color: rgba(18, 18, 18, 0.2);
    border-radius: 4px;
  }
`;
