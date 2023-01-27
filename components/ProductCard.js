import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { motion } from "framer-motion";
import { BsEye } from "react-icons/bs";
import { currencyFormatter } from "utils";
import Heart from "./Heart";
import { useAppContext } from "contexts/AppContext";
import { useRouter } from "next/router";
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

const ProductCard = ({
  id,
  name,
  brand,
  price,
  images,
  slug,
  collection,
  latest,
}) => {
  const router = useRouter();
  const { userInfo } = useAppContext();

  return (
    <article className="relative">
      {latest && <BadgeStyled>New</BadgeStyled>}
      <ImageContainer initial="initial" whileHover="hover">
        <motion.img
          src={images.data[0].attributes.formats.small.url}
          variants={ImageVariants}
        />
        <motion.div variants={OverLayVariants}>
          <ButtonGroup>
            <div>
              <Heart
                productId={id}
                userId={userInfo.id}
                name={name}
                isHomePage
              />
            </div>

            <Link
              href={`/collections/${collection.data.attributes.slug}/${slug}`}
            >
              <BsEye color="#121212" />
            </Link>
          </ButtonGroup>
        </motion.div>
      </ImageContainer>
      <div
        className="flex flex-col gap-2 mt-8 cursor-pointer"
        onClick={() =>
          router.push(`/collections/${collection.data.attributes.slug}/${slug}`)
        }
      >
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
  border-radius: 4px;
  & > div {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: end;
    align-items: end;
    padding: 1em;
    background-color: rgba(18, 18, 18, 0.3);
    border-radius: 4px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1em;
  align-items: center;

  a,
  & > div {
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--light);
    border-radius: 100%;
  }
`;

const BadgeStyled = styled.div`
  background-color: var(--primary);
  width: max-content;
  padding: 0.25em 0.5em;
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  color: var(--light);
  border-radius: 4px;
  z-index: 20;
`;
