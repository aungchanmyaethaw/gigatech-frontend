import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { useAppContext } from "contexts/AppContext";
export const Heart = ({ userId, productId }) => {
  const [isWishlist, setIsWishList] = useState(false);
  const [wishedId, setWishedId] = useState("");
  const { theme, wishlists, removeFromWishList, addToWishList } =
    useAppContext();

  useEffect(() => {
    const isWished = wishlists.find(
      (wishlist) =>
        wishlist.productId === productId && wishlist.userId === userId
    );

    if (isWished) {
      setWishedId(isWished.id);
      setIsWishList(true);
    }
  }, [wishlists]);

  const handleRemoveWishList = () => {
    removeFromWishList(wishedId);
    setWishedId("");
    setIsWishList(false);
  };

  return (
    <WishListBtn className="flex items-center justify-center w-12 text-2xl bg-transparent border-transparent border-2 rounded">
      {isWishlist ? (
        <BsHeartFill
          fill={"#e21945"}
          className="cursor-pointer"
          onClick={handleRemoveWishList}
        />
      ) : (
        <BsHeart
          className="cursor-pointer"
          onClick={() => addToWishList(productId, userId)}
        />
      )}
    </WishListBtn>
  );
};

export default Heart;

const WishListBtn = styled.div`
  border-color: ${(props) => props.theme.textColor};
`;
