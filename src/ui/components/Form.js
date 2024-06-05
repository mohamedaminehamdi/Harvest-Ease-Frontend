import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../state/reducers/authReducer";
import Dropzone from "react-dropzone";
import axios from "axios";

const registerSchema = yup.object({
  name: yup.string().required("required"),
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  name: "",
  email: "",
  password: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        formData
      );
      const savedUser = await response.data;
      onSubmitProps.resetForm();
      if (savedUser) {
        setPageType("login");
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (values, onSubmitProps) => {
    const { email, password } = values;
    const response = await axios.post("http://localhost:3000/auth/login", {
      values: { email, password },
    });
    onSubmitProps.resetForm();
    if (response && response.data) {
      const { user, token } = response.data;
      dispatch(setLogin({ user, token }));
      navigate("/");
    } else {
      console.error("Login failed, no user or token returned.");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {isRegister && (
              <>
                <div className="sm:col-span-2">
                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    placeholder="Name"
                  />
                  {touched.name && errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    placeholder="Email"
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    placeholder="Password"
                  />
                  {touched.password && errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        className="border-dashed border-2 border-gray-300 p-4 rounded-lg cursor-pointer"
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p className="text-center">Add Picture Here</p>
                        ) : (
                          <div className="flex justify-center">
                            <h5>{values.picture.name}</h5>
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                  {touched.picture && errors.picture && (
                    <p className="text-red-500 text-sm">{errors.picture}</p>
                  )}
                </div>
              </>
            )}
            {!isRegister && (
              <>
                <div className="sm:col-span-2">
                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    placeholder="Email"
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <input
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    placeholder="Password"
                  />
                  {touched.password && errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded-md"
            >
              {isLogin ? "Login" : "Register"}
            </button>
            <h4
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              className="text-center text-blue-500 cursor-pointer"
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already Registered? Login here."}
            </h4>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Form;
