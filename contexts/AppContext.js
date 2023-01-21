import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import { GET_CART } from "graphql/cart";
import {
  GET_WISHLISTS,
  DELETE_WISHLISTS,
  ADD_WISHLIST,
} from "graphql/wishlists";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

const AppContext = createContext();

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }) {
  const router = useRouter();

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

  const [result, removeWishList] = useMutation(DELETE_WISHLISTS);
  const [addResult, addWishlist] = useMutation(ADD_WISHLIST);

  const removeFromWishList = async (id) => {
    try {
      const variables = {
        wishlist_id: id,
      };
      const { data, fetching, error } = await removeWishList(variables, {
        fetchOptions: {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      });

      if (!fetching && !error) {
        setWishlists((prev) => {
          return prev.filter((wishlist) => wishlist.id !== id);
        });
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const addToWishList = async (product_id, user_id) => {
    if (!jwt) {
      router.push("/auth");
    }

    try {
      const variables = {
        product: product_id,
        user_id: user_id,
      };
      const { data, fetching, error } = await addWishlist(variables, {
        fetchOptions: {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        },
      });

      if (!fetching && !error) {
        const newWishList = {
          id: data.createWishlist.data.id,
          productId: data.createWishlist.data.attributes.product.data.id,
          productSlug:
            data.createWishlist.data.attributes.product.data.attributes.slug,
          productPrice:
            data.createWishlist.data.attributes.product.data.attributes.price,
          collectionSlug:
            data.createWishlist.data.attributes.product.data.attributes
              .collection.data.attributes.slug,
          userId:
            data.createWishlist.data.attributes.users_permissions_user.data.id,
        };
        setWishlists((prev) => [...prev, newWishList]);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

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
            productName: cart.attributes.product.data.attributes.name,
            productPrice: cart.attributes.product.data.attributes.price,
            productImage: cart.attributes.product.data.attributes.images,
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
            collectionSlug:
              wishlist.attributes.product.data.attributes.collection.data
                .attributes.slug,
            userId: wishlist.attributes.users_permissions_user.data.id,
          };
        })
      );
    }
  }, [wishlistFetching]);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme((prev) => (prev == "light" ? "dark" : "light"));
    localStorage.setItem("theme", newTheme);
  };

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
    removeFromWishList,
    addToWishList,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
