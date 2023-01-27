import React, { useState } from "react";
import { motion } from "framer-motion";
import { FieldSetStyled, Button } from "styles/global.styles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useAppContext } from "contexts/AppContext";
import { useMutation } from "urql";
import { CHANGE_PASSWORD } from "graphql/auth";
import { toast, Toaster } from "react-hot-toast";
import { setCookie } from "nookies";
const schema = yup.object().shape({
  currentpassword: yup.string().min(8).required(),
  newpassword: yup.string().min(8).required(),
  confirmpassword: yup
    .string()
    .required()
    .oneOf([yup.ref("newpassword"), null], "password did not match!"),
});

const ChangePassword = () => {
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [result, updatePassword] = useMutation(CHANGE_PASSWORD);
  const { setJwt } = useAppContext();
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
        current: data.currentpassword,
        new: data.newpassword,
        confirm: data.confirmpassword,
      };
      const {
        data: passwordData,
        fetching,
        error,
      } = await updatePassword(variables);

      if (error) {
        toast.error(error.message);
      }

      if (!fetching && !error) {
        setJwt(passwordData.changePassword.jwt);

        setCookie(null, "jwt", passwordData.changePassword.jwt, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
          sameSite: "none",
        });

        toast.success("Password change successfully.");
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
          type="password"
          id="currentpassword"
          placeholder=" "
          {...register("currentpassword")}
        />
        <label htmlFor="password">current password</label>
        {errors.currentpassword && (
          <span className="block mt-2 text-error">
            {errors.currentpassword.message}
          </span>
        )}
      </FieldSetStyled>
      <FieldSetStyled className="mb-16">
        <input
          type="password"
          id="newpassword"
          placeholder=" "
          {...register("newpassword")}
        />
        <label htmlFor="password">Password</label>
        {errors.password && (
          <span className="block mt-2 text-error">
            {errors.newpassword.message}
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

      <Button type="submit" disabled={disabledBtn}>
        {disabledBtn ? "Updating" : "Update"}
      </Button>
    </motion.form>
  );
};

export default ChangePassword;
