import React from 'react';
import Footer from '../Components/Footer/Footer';


export const BackofficeLayout = ({children}) => {
  return(
    <>
      {/* Tag de header comentado hasta el merge del mismo. */}
      {/* <BackofficeHeader/> */}
      {children}
      <Footer />
    </>
  );
};