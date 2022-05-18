import React from 'react';
import Footer from '../Components/Footer/Footer';
import BackofficeHeader from '../Components/BackofficeHeader/BackofficeHeader';

export const BackofficeLayout = ({children}) => {
  return(
    <>
      <BackofficeHeader/>
      {children}
      <Footer />
    </>
  );
};

export default BackofficeLayout;