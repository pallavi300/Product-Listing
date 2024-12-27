import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/ Button";
import { useNavigate } from "react-router-dom";

const Form = ({ isSignInPage = false }) => {
  const [data, setData] = useState({
    ...(!isSignInPage && {
      fullName: "",
    }),
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log(data, "Submitted Data");

    try {
      // Make the request to the correct endpoint (register or login)
      const response = await fetch(
        `http://localhost:8000/api/${isSignInPage ? "login" : "register"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      // Handle response for bad request
      if (response.status === 400) {
        alert("Invalid Credentials. Please try again.");
        return;
      }

      const resData = await response.json();
      console.log(resData, "Server Response");

      if (!isSignInPage) {
        // Show success alert for registration
        alert("Registration successful! You can now sign in.");
        navigate("/users/sign_in");

        // Reset the form fields after successful registration
        setData({
          fullName: "",
          email: "",
          password: "",
        });
      }

      if (resData.token) {
        // Save token and user details in localStorage
        localStorage.setItem("user:token", JSON.stringify(resData.token));
        localStorage.setItem("user:detail", JSON.stringify(resData.user));

        // Redirect to home page
        navigate("/");
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-light h-screen flex  items-center justify-center">
      <div className="bg-white w-[600px] h-[800px]  shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className="text-4xl font-extrabold">
          Welcome {isSignInPage && "Back"}
        </div>
        <div className="text-xl font-light mb-14">
          {isSignInPage
            ? "Sign in to get explored"
            : "Sign up now to get started"}
        </div>
        <form
          className="flex flex-col items-center w-full"
          onSubmit={(e) => handelSubmit(e)}
        >
          {!isSignInPage && (
            <Input
              label="Full name"
              name="name"
              className="mb-5"
              placeholder="Enter your full name"
              value={data.fullName}
              onChange={(e) => {
                setData({ ...data, fullName: e.target.value });
              }}
            />
          )}
          <Input
            label="Email"
            type="email"
            name="email"
            className="mb-5"
            placeholder="Enter your full email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          />
          <Input
            label="Password"
            name="password"
            className="mb-10"
            placeholder="Enter your password"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
          />
          <Button
            label={isSignInPage ? "Sign in" : "Sign up"}
            className="w-1/2 mb-2"
            type="submit"
          />
        </form>
        <div>
          {isSignInPage ? "Didn't have account " : "Already have an account "}
          <span
            className="text-primary cursor-pointer underline"
            onClick={() => {
              navigate(`/users/${isSignInPage ? "sign_up" : "sign_in"}`);
            }}
          >
            {isSignInPage ? "Sign up" : "Sign in"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Form;
