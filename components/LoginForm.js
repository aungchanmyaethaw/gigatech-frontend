import React, { useState } from "react";
import { FieldSetStyled, Button } from "styles/global.styles";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { LOG_IN_USER } from "graphql/auth";
import { useMutation } from "urql";
import { useAppContext } from "contexts/AppContext";
import { toast, Toaster } from "react-hot-toast";
const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [result, updateUserLogIn] = useMutation(LOG_IN_USER);
  const [disbledBtn, setDisabledBtn] = useState(false);
  const { setUserInfo, setJwt } = useAppContext();

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      setDisabledBtn(true);
      const variables = { identifier: data.email, password: data.password };
      const {
        data: userData,
        fetching,
        error,
      } = await updateUserLogIn(variables);

      if (error) {
        toast.error(error.message);
      }
      if (!fetching && !error) {
        setUserInfo((prev) => {
          return {
            ...prev,
            id: userData?.login.user.id,
            username: userData?.login.user.username,
            email: userData?.login.user.email,
          };
        });

        setJwt(userData.login.jwt);

        setCookie(null, "jwt", userData.login.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          sameSite: "none",
        });

        localStorage.setItem(
          "user",
          JSON.stringify({
            id: userData.login.user.id,
            username: userData.login.user.username,
            email: userData.login.user.email,
          })
        );
        toast.success("Logged in successfully.");
        router.push("/");
      }

      setDisabledBtn(false);
      reset();
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <motion.form
      className="flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
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
      <FieldSetStyled className="mb-16">
        <input type="email" id="email" placeholder=" " {...register("email")} />
        <label htmlFor="email">E-mail</label>
        {errors.email && (
          <span className="block mt-2 text-error">{errors.email.message}</span>
        )}
      </FieldSetStyled>
      <FieldSetStyled className="mb-16">
        <input
          type="password"
          id="password"
          placeholder=" "
          {...register("password")}
        />

        <label htmlFor="password">Password</label>
        {errors.password && (
          <span className="block mt-2 text-error">
            {errors.password.message}
          </span>
        )}
      </FieldSetStyled>

      <Button type="submit" disabled={disbledBtn}>
        {disbledBtn ? "Logging In" : "Log In"}
      </Button>
    </motion.form>
  );
};

export default LoginForm;
