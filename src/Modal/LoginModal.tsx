import { useFormik } from "formik";
import * as Yup from "yup";
import CustomTextField from "../Component/CustomTextField";
import CustomButton from "../Component/CustomButton";
import toast from "react-hot-toast";
import { Login } from "../Service/Service";
import { useDispatch } from "react-redux";
import { UseLoader } from "../Hooks/UseLoder";
import { closeModal } from "../Redux/Slice/ModalSlice";
import { loginSuccess } from "../Redux/Slice/authSlice";
import React from "react";

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().min(6).required("Password required"),
});
const LoginMoal = React.memo(() => {
  const loginFormik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      handleLogin(values);
    },
  });

  const dispatch = useDispatch();
  const { startLoading, stopLoading } = UseLoader();

  const handleLogin = (values: any) => {
    startLoading();
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
    };

    Login(payload)
      .then((res) => {
        if (res.status == 200) {
          toast.success(res?.data?.message);

          const token = res?.data?.token;
          const user=res?.data?.data
          dispatch(closeModal());
          dispatch(
            loginSuccess({
              token,
              user,
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
      <div>
        <CustomTextField
          labelname="Email"
          name="email"
          placeholder="Enter Email"
          formik={loginFormik}
          // startIcon={<EmailIcon />}
          height={50}
        />
        <CustomTextField
          labelname="Password"
          name="password"
          type="password"
          placeholder="Enter Password"
          formik={loginFormik}
          // startIcon={<EmailIcon />}
          height={50}
        />

        <CustomButton
          label="Login"
          fullWidth
          type="submit"
          variant="contained"
          backgroundColor="var(--primary)"
        />
      </div>
    </form>
  );
});
export default LoginMoal;
