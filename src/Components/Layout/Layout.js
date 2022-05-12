import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import RegisterForm from "../Auth/RegisterForm";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
