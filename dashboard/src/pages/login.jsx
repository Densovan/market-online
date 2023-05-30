import React, { useState, useContext } from "react";
import axios from "../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import AuthContext from "../context/authProvider";
import useAuth from "../hooks/useAuth";
import ModalMessage from "../components/modalMessage";

const config = {
  headers: { "content-type": "application/json" },
  withCredentials: true,
};
const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };
  console.log(errMsg, "msg");
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { email, password } = formData;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      setFormErrors(validateForm(formData));
    } else {
      try {
        //input api
        await axios.post(`/api/auth/login`, formData, config).then((res) => {
          const accessToken = res?.data?.accessToken;
          const role = res?.data?.role;
          setAuth({ accessToken, role });
          navigate(from, { replace: true });
        });
      } catch (err) {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Login Failed");
        }
        handleOpenModal();
        console.log(err.message);
      }
    }
  };
  const validateForm = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "please input your email";
    }
    if (!values.password) {
      errors.password = "please input your password";
    }
    return errors;
  };
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white w-[500px] rounded">
          <div className="p-12">
            <h1 className="text-center font-bold text-gray-400">
              Login to your Dashboard
            </h1>
            {showModal && (
              <ModalMessage message={errMsg} onClose={handleCloseModal} />
            )}
            <form onSubmit={handleSubmit} className="mt-12">
              <div className="mb-4">
                <label className="block mb-2 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  // className="border-solid border-2 w-full p-3 rounded-md"
                  className={`${
                    formErrors.email
                      ? "border-red-500 border-solid border-2 w-full p-3 rounded-md placeholder-red-500"
                      : "border-solid border-2 w-full p-3 rounded-md"
                  }`}
                  placeholder="Email"
                />
                <small className="text-red-500">{formErrors.email}</small>
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm">Password</label>
                <input
                  name="password"
                  onChange={handleChange}
                  type="password"
                  values={password}
                  className={`${
                    formErrors.password
                      ? "border-red-500 border-solid border-2 w-full p-3 rounded-md placeholder-red-500"
                      : "border-solid border-2 w-full p-3 rounded-md"
                  }`}
                  placeholder="Password"
                />
                <small className="text-red-500">{formErrors.password}</small>
              </div>
              <button className="bg-primary text-white px-6 py-2 w-full rounded">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
