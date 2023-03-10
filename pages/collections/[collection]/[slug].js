import React, { useState } from "react";
import { withUrqlClient } from "next-urql";
import { useMutation, useQuery } from "urql";
import { client, ssrCache } from "utils/urqlClient";
import { GET_SINGLE_PRODUCT } from "graphql/products";
import { useRouter } from "next/router";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { BsCart } from "react-icons/bs";
import styled from "styled-components";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { currencyFormatter } from "utils";
import { ContainerStyled, UnderLine, Button } from "styles/global.styles";
import ImageMagnifier from "components/ImageMagnifier";
import { useAppContext } from "contexts/AppContext";
import { Add_Cart, UPDATE_QTY } from "graphql/cart";
import Heart from "components/Heart";
const ProductDetails = () => {
  const { userInfo, carts, setCarts, jwt, setTotalAmount } = useAppContext();
  const router = useRouter();
  const [result] = useQuery({
    query: GET_SINGLE_PRODUCT,
    variables: { slug: router.query.slug },
  });

  const [cartResult, addCart] = useMutation(Add_Cart);
  const [qtyResult, updateQty] = useMutation(UPDATE_QTY);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [qty, setQty] = useState(1);

  const increaseQty = () => {
    setQty((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQty((prev) => {
      return prev <= 1 ? 1 : prev - 1;
    });
  };

  const handleSubmit = async (qty, product_id, user_id, name, price) => {
    if (!jwt) {
      toast.error("Please log in to add items into cart.");
    } else {
      setTotalAmount((prev) => prev + qty * price);
      const existedProduct = carts.find(
        (cart) => cart.productId === product_id && cart.userId === user_id
      );
      if (existedProduct) {
        const variables = {
          qty: existedProduct.qty + qty,
          cart_id: existedProduct.id,
        };
        try {
          setDisabledBtn(true);
          const { data, fetching, error } = await updateQty(variables, {
            fetchOptions: {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            },
          });

          if (!fetching && !error) {
            toast.success(`${name} is Added to cart.`);

            setCarts((prev) => {
              return prev.map((cart) =>
                cart.id === existedProduct.id
                  ? { ...cart, qty: existedProduct.qty + qty }
                  : cart
              );
            });
          }
          setDisabledBtn(false);
        } catch (e) {
          console.log(e);
          setDisabledBtn(false);
        }
      } else {
        setDisabledBtn(true);
        const variables = { qty, product: product_id, user_id };
        try {
          const { data, fetching, error } = await addCart(variables, {
            fetchOptions: {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            },
          });
          if (!fetching && !error) {
            toast.success(`${name} is Added to cart.`);

            const newCart = {
              id: data.createCart.data.id,
              qty: data.createCart.data.attributes.QTY,
              productId: data.createCart.data.attributes.product.data.id,
              productSlug:
                data.createCart.data.attributes.product.data.attributes.slug,
              productPrice:
                data.createCart.data.attributes.product.data.attributes.price,
              productName:
                data.createCart.data.attributes.product.data.attributes.name,
              productImage:
                data.createCart.data.attributes.product.data.attributes.images,
              collectionSlug:
                data.createCart.data.attributes.product.data.attributes
                  .collection.data.attributes.slug,
              userId:
                data.createCart.data.attributes.users_permissions_user.data.id,
            };

            setCarts((prev) => {
              return [...prev, newCart];
            });

            setDisabledBtn(false);
            setQty(1);
          }
        } catch (e) {
          setQty(1);
          setDisabledBtn(false);
          console.log(e);
        }
      }
    }
  };

  const { data, fetching, error } = result;

  if (fetching) {
    return <h1>Loading...</h1>;
  }

  const id = data?.products.data[0].id;
  const product = data?.products.data[0].attributes;
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
          className="md:!flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "tween", duration: 0.5 }}
        >
          <Toaster
            position="top-center"
            toastOptions={{
              error: {
                duration: 3000,
              },
              success: {
                duration: 3000,
              },
            }}
          />
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
            <h3 className="mb-4 text-2xl md:text-3xl">{name}</h3>
            <UnderLine className="!w-[25%] mb-8" />
            <p className="mb-4 text-base">{description}</p>
            <ButtonGroup>
              <Quantity>
                <span className="text-2xl font-semibold text-primary">
                  {currencyFormatter.format(price)}
                </span>
                <div className="flex items-center gap-3">
                  <AiFillMinusCircle onClick={decreaseQty} />
                  <p className="text-2xl font-medium">{qty}</p>
                  <AiFillPlusCircle onClick={increaseQty} />
                </div>
              </Quantity>
              <AddToCartAndWishList>
                <Button
                  className="flex items-center justify-center gap-4 basis-full lg:basis-1/2 md:basis-3/4"
                  onClick={() =>
                    handleSubmit(qty, id, userInfo.id, name, price)
                  }
                  disabled={disabledBtn}
                >
                  {disabledBtn ? <span>Adding</span> : <span>Add to Cart</span>}
                  <BsCart className="text-xl" />
                </Button>
                <WishListBtn className="flex items-center justify-center w-12 bg-transparent border-2 border-transparent rounded h-12">
                  <Heart userId={userInfo.id} productId={id} name={name} />
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
  align-items: center;
  gap: 1em;
`;

const WishListBtn = styled.div`
  border-color: ${(props) => props.theme.textColor};
`;
