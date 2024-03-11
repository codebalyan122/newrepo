import React, { useEffect, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required ")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required ")
    .min(4, "Password must be at least 4 characters"),
});

const Register = () => {
  const navigate = useNavigate();

  const [response, setResponse] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const handleResponse = () => {
      if (response) {
        localStorage.setItem("token", response?.data?.token);
        console.log(response);
        navigate("/");
      }
    };

    handleResponse(); // Call the handleResponse logic when response changes
  }, [response, navigate]);

  return (
    <div style={{ width: "100vw", height: "100vh" }} className="loginform">
      {error && toast.error(error?.response?.data?.error)}
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            const resData = await axios.post("http://localhost:8080/register", {
              ...values,
            });
            setResponse(resData);
          } catch (error) {
            setError(error);
            console.log(error);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
            <div className="form">
              <form noValidate onSubmit={handleSubmit}>
                <span>Login</span>
                <Field
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email id / username"
                  className="form-control inp_text"
                  id="email"
                />
                <ErrorMessage name="email" component="div" className="error" />

                <Field
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />

                <button type="submit">Register</button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Register;
