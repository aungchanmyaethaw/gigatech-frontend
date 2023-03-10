import React, { useState } from "react";
import { FieldSetStyled, Button } from "styles/global.styles";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setCookie } from "nookies";
import { useMutation } from "urql";
import { REGISTER_USER } from "graphql/auth";
import { useAppContext } from "contexts/AppContext";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
const schema = yup.object().shape({
  username: yup.string().min(4).max(20).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmpassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "password did not match!"),
});

const RegisterForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [result, updateUserLogIn] = useMutation(REGISTER_USER);
  const [disbledBtn, setDisabledBtn] = useState(false);

  const { setUserInfo, setJwt } = useAppContext();

  const onSubmit = async (data) => {
    try {
      setDisabledBtn(true);
      const variables = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
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
            id: userData?.register.user.id,
            username: userData?.register.user.username,
            email: userData?.register.user.email,
          };
        });
        setJwt(userData.register.jwt);
        setCookie(null, "jwt", userData.register.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          sameSite: "none",
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: userData?.register.user.id,
            username: userData?.register.user.username,
            email: userData?.register.user.email,
          })
        );
        toast.success("Registered successfully.");
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
        <input
          type="text"
          id="username"
          placeholder=" "
          {...register("username")}
        />
        <label htmlFor="username">Username</label>
        {errors.username && (
          <span className="block mt-2 text-error">
            {errors.username.message}
          </span>
        )}
      </FieldSetStyled>
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

      <FieldSetStyled className="mb-16">
        <input
          type="password"
          id="confirmpassword"
          placeholder=" "
          {...register("confirmpassword")}
        />
        <label htmlFor="confirmpassword">Confirm Password</label>
        {errors.confirmpassword && (
          <span className="block mt-2 text-error">
            {errors.confirmpassword.message}
          </span>
        )}
      </FieldSetStyled>
      <Button type="submit">Register</Button>
    </motion.form>
  );
};

export default RegisterForm;
