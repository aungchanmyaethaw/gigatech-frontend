import React, { useEffect, useState } from "react";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { useAppContext } from "contexts/AppContext";
import toast, { Toaster } from "react-hot-toast";
export const Heart = ({ userId, productId, isHomePage = false, name }) => {
  const [isWishlist, setIsWishList] = useState(false);
  const [wishedId, setWishedId] = useState("");
  const { wishlists, removeFromWishList, addToWishList } = useAppContext();

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

  const handleAddWishList = () => {
    addToWishList(productId, userId);
    toast.success(`${name} is added from wishList.`);
  };

  const handleRemoveWishList = () => {
    removeFromWishList(wishedId);
    setWishedId("");
    setIsWishList(false);
    toast.error(`${name} is removed from wishList.`);
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
          },
        }}
      />
      {isWishlist ? (
        <BsHeartFill
          fill={"#e21945"}
          className={`text-2xl cursor-pointer ${isHomePage ? "text-base" : ""}`}
          onClick={handleRemoveWishList}
        />
      ) : (
        <BsHeart
          className={`text-2xl cursor-pointer hover:fill-error ${
            isHomePage ? "text-dark-200  text-base" : ""
          } `}
          onClick={handleAddWishList}
        />
      )}
    </>
  );
};

export default Heart;
