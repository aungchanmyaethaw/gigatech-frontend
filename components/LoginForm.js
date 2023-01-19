import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { LOG_IN_USER } from "graphql/auth";
import { useMutation } from "urql";
import { useAppContext } from "contexts/AppContext";
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
        sameSite: "None",
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userData?.login.user.id,
          username: userData.login.user.username,
          email: userData.login.user.email,
        })
      );
      router.push("/");
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
      <FieldSetStyled className="mb-16">
        <input
          type="email"
          id="email"
          placeholder=" "
          {...register("email", { required: true })}
        />
        <label htmlFor="email">E-mail</label>
        {errors.email && (
          <span className="block mt-2 text-error">{errors.email.message}</span>
        )}
      </FieldSetStyled>
      <FieldSetStyled>
        <input
          type="password"
          id="password"
          placeholder=" "
          {...register("password", { required: true, minLength: 8 })}
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

const FieldSetStyled = styled.fieldset`
  max-width: 40rem;
  width: 100%;
  position: relative;
  input {
    width: 100%;
    padding: 2px 0;
    background-color: transparent;
    border: none;
    border-bottom: 2px solid var(--primary);

    &:not(focus),
    &:placeholder-shown {
      & + label {
        font-size: 1rem;
      }
    }

    &:focus,
    &:not(:placeholder-shown) {
      outline: none;
      & + label {
        font-size: 0.75rem;
        top: -1.25rem;
        color: var(--primary);
      }
    }
  }
  label {
    position: absolute;
    top: -4px;
    left: 0;
    font-weight: 600;
    text-transform: uppercase;
    transition: top 200ms ease-in, font-size 200ms ease-in, color 200ms ease-in;
  }
`;

const Button = styled.button`
  margin-top: 5rem;
  padding: 0.75em 1.5em;
  position: relative;
  overflow: hidden;
  color: var(--primary);
  font-family: var(--font-heading);
  font-weight: 600;
  background-color: ${(props) => props.theme.backgroundColor};
  border-radius: 4px;
  z-index: 1;
  transition: color 300ms ease-in;
  border: 2px solid var(--primary);

  &:disabled {
    background-color: rgba(0, 116, 228, 0.5) !important;
    color: var(--light) !important;
    cursor: disabled;
  }

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    inset: 0;
    background-color: var(--primary);
    border-radius: 0.75rem;
    transform: scale(0);
    transition: transform 300ms ease-in;
    z-index: -1;
  }

  &:not(:disabled):hover,
  &:not(:disabled):active {
    color: var(--light);
    &:before {
      transform: scale(1.5);
    }
  }
`;
