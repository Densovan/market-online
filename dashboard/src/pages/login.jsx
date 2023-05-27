import React, { useState } from "react";

const { VITE_API_LOCAL, VITE_API_PRODUCTION, DEV } = import.meta.env;
const url = DEV === true ? VITE_API_LOCAL : VITE_API_PRODUCTION;
const Login = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email === "" || formData.password === "") {
      setFormErrors(validateForm(formData));
    } else {
      //input api
      setFormData({});
      setFormErrors({});
    }
    console.log("click");
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
            <form onSubmit={handleSubmit} className="mt-12">
              <div className="mb-4">
                <label className="block mb-2 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
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
