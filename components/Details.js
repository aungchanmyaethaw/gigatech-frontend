import React, { useState } from "react";
import { motion } from "framer-motion";
import { FieldSetStyled, Button } from "styles/global.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppContext } from "contexts/AppContext";
import { useMutation } from "urql";
import { UPDATE_USER } from "graphql/auth";
import { toast, Toaster } from "react-hot-toast";
const schema = yup.object().shape({
  username: yup.string().min(4).max(20).required(),
  email: yup.string().email().required(),
});
const Details = () => {
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [result, updateUserInfo] = useMutation(UPDATE_USER);
  const { userInfo, setUserInfo } = useAppContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setDisabledBtn(true);
      const variables = {
        id: userInfo.id,
        username: data.username,
        email: data.email,
      };
      const {
        data: userData,
        fetching,
        error,
      } = await updateUserInfo(variables);

      if (error) {
        toast.error(error.message);
      }

      if (!fetching && !error) {
        setUserInfo((prev) => {
          return {
            ...prev,
            username:
              userData?.updateUsersPermissionsUser.data.attributes.username,
            email: userData?.updateUsersPermissionsUser.data.attributes.email,
          };
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: userData?.updateUsersPermissionsUser.data.id,
            username:
              userData?.updateUsersPermissionsUser.data.attributes.username,
            email: userData?.updateUsersPermissionsUser.data.attributes.email,
          })
        );
        toast.success("User info updated.");
      }
      setDisabledBtn(false);
      reset();
    } catch (e) {
      toast.error(e.message);
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
          defaultValue={userInfo.username}
        />
        <label htmlFor="username">username</label>
        {errors.username && (
          <span className="block mt-2 text-error">
            {errors.username.message}
          </span>
        )}
      </FieldSetStyled>
      <FieldSetStyled className="mb-16">
        <input
          type="email"
          id="email"
          placeholder=" "
          {...register("email")}
          defaultValue={userInfo.email}
        />
        <label htmlFor="email">E-mail</label>
        {errors.email && (
          <span className="block mt-2 text-error">{errors.email.message}</span>
        )}
      </FieldSetStyled>

      <Button type="submit" disabled={disabledBtn}>
        {disabledBtn ? "Updating" : "Update"}
      </Button>
    </motion.form>
  );
};

export default Details;
