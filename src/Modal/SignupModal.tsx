import { useFormik } from "formik";
import * as Yup from "yup";
import CustomTextField from "../Component/CustomTextField";
import CustomButton from "../Component/CustomButton";
import { Signup } from "../Service/Service";
import toast from "react-hot-toast";
import { UseLoader } from "../Hooks/UseLoder";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../Redux/Slice/ModalSlice";
import React from "react";

const loginSchema = Yup.object({
  name: Yup.string().required("Name required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().min(6).required("Password required"),
});

const SignupModal = React.memo(() => {
  const loginFormik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: loginSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  const dispatch = useDispatch();
  const { startLoading, stopLoading } = UseLoader();
  const handleSignUp = (values: any) => {
    startLoading();
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    Signup(payload)
      .then((res) => {
        if (res.status == 201) {
          toast.success("sucess fully Signup");
          dispatch(closeModal());
          dispatch(
            openModal({
              modalname: "LOGIN",
              data: {
                title: "Login",
                size: "xs",
              },
            }),
          );
        }

        // else {
        //   toast.error(res.data?.message);
        // }
      })
      .catch((err) => {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong";

        toast.error(message);
      })
      .finally(() => stopLoading());
  };

  return (
    <form onSubmit={loginFormik.handleSubmit}>
      <CustomTextField
        labelname="Full Name"
        name="name"
        placeholder="Enter Full Name"
        formik={loginFormik}
        height={50}
      />

      <CustomTextField
        labelname="Email"
        name="email"
        type="email"
        placeholder="Enter Email"
        formik={loginFormik}
        height={50}
      />

      <CustomTextField
        labelname="Password"
        name="password"
        placeholder="Enter Password"
        formik={loginFormik}
        height={50}
        type="password"
      />

      <CustomButton
        label="Sign Up"
        fullWidth
        type="submit"
        variant="contained"
        backgroundColor="var(--primary)"
      />
    </form>
  );
});
export default SignupModal;
