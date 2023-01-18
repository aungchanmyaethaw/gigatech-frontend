import React from "react";
import { withUrqlClient } from "next-urql";
import { useQuery } from "urql";
import { client, ssrCache } from "utils/urqlClient";
import { GET_SINGLE_PRODUCT } from "graphql/products";
import { useRouter } from "next/router";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsHeart, BsCart } from "react-icons/bs";
import styled from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { currencyFormatter } from "utils";
import { ContainerStyled, UnderLine, Button } from "styles/global.styles";
import ImageMagnifier from "components/ImageMagnifier";
import { motion } from "framer-motion";
const ProductDetails = () => {
  const router = useRouter();

  const [result] = useQuery({
    query: GET_SINGLE_PRODUCT,
    variables: { slug: router.query.slug },
  });

  const { data, fetching, error } = result;
  const product = data.products.data[0].attributes;
  const { name, brand, description, price, images } = product;

  return (
    <ContainerStyled>
      {fetching ? (
        <ProductDetailsRow className="lg:!flex-row">
          <SkeletonTheme baseColor="#ddd" highlightColor="#fff">
            <ImageContainer>
              <Skeleton width={360} height={360} />
            </ImageContainer>
            <ProductInfo>
              <Skeleton width={120} />
              <Skeleton height={24} style={{ marginBottom: "1em" }} />
              <Skeleton width={320} />
              <Skeleton width={380} />
              <Skeleton width={400} />
              <Skeleton width={370} />
              <Skeleton width={390} />
            </ProductInfo>
          </SkeletonTheme>
        </ProductDetailsRow>
      ) : null}
      {!fetching ? (
        <ProductDetailsRow
          className="lg:!flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "tween", duration: 0.5 }}
        >
          <ImageContainer>
            <ImageMagnifier
              width={360}
              height={360}
              magnifierWidth={150}
              magnifierHeight={150}
              src={images.data[0].attributes.formats.small.url}
            />
          </ImageContainer>

          <ProductInfo>
            <h4 className="mb-2 text-xl font-bold uppercase">{brand}</h4>
            <h3 className="mb-4 text-3xl">{name}</h3>
            <UnderLine className="!w-[25%] mb-8" />
            <p className="mb-4 text-base">{description}</p>
            <ButtonGroup>
              <Quantity>
                <span className="text-2xl font-semibold text-primary">
                  {currencyFormatter.format(price)}
                </span>
                <div className="flex items-center gap-3">
                  <AiFillMinusCircle />
                  <p className="text-2xl font-medium">{1}</p>
                  <AiFillPlusCircle />
                </div>
              </Quantity>
              <AddToCartAndWishList>
                <Button className="flex items-center justify-center gap-4 basis-1/2">
                  <span>Add to Cart</span>
                  <BsCart className="text-xl" />
                </Button>
                <WishListBtn className="flex items-center justify-center w-12 text-xl bg-transparent border-2 rounded cursor-pointer ">
                  <BsHeart />
                </WishListBtn>
              </AddToCartAndWishList>
            </ButtonGroup>
          </ProductInfo>
        </ProductDetailsRow>
      ) : null}
    </ContainerStyled>
  );
};

export default withUrqlClient((_ssrExchange) => ({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL,
}))(ProductDetails);

export async function getServerSideProps(ctx) {
  await client.query(GET_SINGLE_PRODUCT, { slug: ctx.query.slug }).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
}

const ProductDetailsRow = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  gap: 2rem;
`;

const ImageContainer = styled.div`
  flex-basis: 50%;
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const ProductInfo = styled.div`
  flex-basis: 50%;
  flex-grow: 1;
`;

const Quantity = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5em;
  svg {
    font-size: 1.75rem;
    cursor: pointer;
    color: ${(props) => props.theme.textColor};
  }
`;

const ButtonGroup = styled.div`
  margin: 1.5em 0 0;
`;

const AddToCartAndWishList = styled.div`
  margin: 2em 0 0;
  width: 100%;
  display: flex;
  gap: 1em;
`;

const WishListBtn = styled.div`
  color: ${(props) => props.theme.textColor};
  border-color: ${(props) => props.theme.textColor};
`;