import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "urql";
import { GET_CART } from "graphql/cart";
import { GET_WISHLISTS } from "graphql/wishlists";
import { parseCookies } from "nookies";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const [theme, setTheme] = useState("");
  const [jwt, setJwt] = useState("");
  const [userInfo, setUserInfo] = useState({ id: "", username: "", email: "" });
  const [carts, setCarts] = useState([]);
  const [wishlists, setWishlists] = useState([]);
  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: GET_CART,
    variables: {
      user_id: userInfo.id,
    },
  });
  const [
    { data: wishlistData, fetching: wishlistFetching, error: wishlistError },
    reexecuteQueryforWishList,
  ] = useQuery({
    query: GET_WISHLISTS,
    variables: {
      user_id: userInfo.id,
    },
  });

  useEffect(() => {
    if (!jwt) {
      return;
    }

    reexecuteQuery({ requestPolicy: "network-only" });
    reexecuteQueryforWishList({ requestPolicy: "network-only" });
  }, [jwt]);

  useEffect(() => {
    if (!fetching && !error && data.carts.data.length > 0) {
      setCarts(
        data.carts.data.map((cart) => {
          return {
            id: cart.id,
            qty: cart.attributes.QTY,
            productId: cart.attributes.product.data.id,
            productSlug: cart.attributes.product.data.attributes.slug,
            productPrice: cart.attributes.product.data.attributes.price,
            userId: cart.attributes.users_permissions_user.data.id,
          };
        })
      );
    }
  }, [fetching]);

  useEffect(() => {
    if (
      !wishlistFetching &&
      !wishlistError &&
      wishlistData.wishlists.data.length > 0
    ) {
      setWishlists(
        wishlistData.wishlists.data.map((wishlist) => {
          return {
            id: wishlist.id,
            productId: wishlist.attributes.product.data.id,
            productSlug: wishlist.attributes.product.data.attributes.slug,
            productPrice: wishlist.attributes.product.data.attributes.price,
            userId: wishlist.attributes.users_permissions_user.data.id,
          };
        })
      );

      // );
    }
  }, [wishlistFetching]);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme((prev) => (prev == "light" ? "dark" : "light"));
    localStorage.setItem("theme", newTheme);
  };

  const handleAddToCart = () => {};

  useEffect(() => {
    const cookies = parseCookies();

    if (cookies.jwt) {
      setJwt(cookies.jwt);
      const user = JSON.parse(localStorage.getItem("user"));
      setUserInfo((prev) => {
        return { ...prev, ...user };
      });
    }
  }, []);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme == null) {
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else {
      setTheme(currentTheme);
    }
  }, []);

  const contextValue = {
    theme,
    handleToggleTheme,
    jwt,
    setJwt,
    userInfo,
    setUserInfo,
    carts,
    setCarts,
    wishlists,
    setWishlists,
    fetching,
    wishlistFetching,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
