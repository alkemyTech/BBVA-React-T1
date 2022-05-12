import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
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
