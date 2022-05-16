import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RegisterForm from "../Components/Auth/RegisterForm";

const PublicLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default PublicLayout;
