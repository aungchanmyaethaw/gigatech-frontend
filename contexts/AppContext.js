import { createContext, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "urql";
import { GET_CART } from "graphql/cart";
import { GET_ORDERS } from "graphql/orders";
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
  const [orders, setOrders] = useState([]);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isMobileNavbarClose, setIsMobileNavbarClose] = useState(false);

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

  const [
    { data: orderData, fetching: orderFetching, error: orderError },
    reexecuteQueryforOrder,
  ] = useQuery({
    query: GET_ORDERS,
    variables: { user_id: userInfo.id },
  });

  const [result, removeWishList] = useMutation(DELETE_WISHLISTS);
  const [addResult, addWishlist] = useMutation(ADD_WISHLIST);

  const handleSearchBarOpen = () => {
    setIsSearchBarOpen(true);
    document.body.style.maxHeight = "100vh";
    document.body.style.overflowY = "hidden";
  };
  const handleSearchBarClose = () => {
    setIsSearchBarOpen(false);
    document.body.style.maxHeight = "";
    document.body.style.overflowY = "";
  };

  const handleMobileNavbarOpen = () => {
    setIsMobileNavbarClose(true);
    document.body.style.maxHeight = "100vh";
    document.body.style.overflowY = "hidden";
  };

  const handleMobileNavbarClose = () => {
    setIsMobileNavbarClose(false);
    document.body.style.maxHeight = "";
    document.body.style.overflowY = "";
  };
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

  useEffect(() => {
    if (!jwt) {
      return;
    }

    reexecuteQuery({ requestPolicy: "network-only" });
    reexecuteQueryforWishList({ requestPolicy: "network-only" });
    reexecuteQueryforOrder({ requestPolicy: "network-only" });
  }, [jwt]);

  useEffect(() => {
    if (!fetching && !error && data.carts.data.length > 0) {
      const tempCarts = data.carts.data;
      setCarts(
        tempCarts.map((cart) => {
          const { id: productId } = cart.attributes.product.data;
          const { id: userId } = cart.attributes.users_permissions_user.data;
          const {
            slug: productSlug,
            name: productName,
            price: productPrice,
            images: productImage,
          } = cart.attributes.product.data.attributes;
          return {
            id: cart.id,
            qty: cart.attributes.QTY,
            productId,
            productSlug,
            productName,
            productPrice,
            productImage,
            userId,
          };
        })
      );
    }
  }, [fetching]);

  useEffect(() => {
    handleTotalAmount();
  }, [carts]);

  useEffect(() => {
    if (
      !wishlistFetching &&
      !wishlistError &&
      wishlistData.wishlists.data.length > 0
    ) {
      const tempWishlists = wishlistData.wishlists.data;
      setWishlists(
        tempWishlists.map((wishlist) => {
          const { id: productId } = wishlist.attributes.product.data;

          const { slug: productSlug, price: productPrice } =
            wishlist.attributes.product.data.attributes;
          const { slug: collectionSlug } =
            wishlist.attributes.product.data.attributes.collection.data
              .attributes;
          const { id: userId } =
            wishlist.attributes.users_permissions_user.data;

          return {
            id: wishlist.id,
            productId,
            productSlug,
            productPrice,
            collectionSlug,
            userId,
          };
        })
      );
    }
  }, [wishlistFetching]);

  useEffect(() => {
    if (!orderFetching && !orderError && orderData.orders.data.length > 0) {
      const tempOrders = orderData.orders.data;

      setOrders(
        tempOrders.map((order) => {
          return {
            id: order.id,
            totalAmount: order.attributes.total_amount,
            date: order.attributes.createdAt,
          };
        })
      );
    }
  }, [orderFetching]);

  const handleTotalAmount = () => {
    const tempTotal = carts.reduce(
      (prev, current) => prev + current.qty * current.productPrice,
      0
    );
    setTotalAmount(tempTotal);
  };

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme((prev) => (prev == "light" ? "dark" : "light"));
    localStorage.setItem("theme", newTheme);
  };

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
    handleSearchBarOpen,
    handleSearchBarClose,
    isSearchBarOpen,
    orders,
    totalAmount,
    setOrders,
    handleMobileNavbarOpen,
    handleMobileNavbarClose,
    isMobileNavbarClose,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
