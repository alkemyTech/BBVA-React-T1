import React, { useEffect, useState } from "react";
import "./Nosotros.css";
import { Get } from "./../../Services/privateApiService";
import Spinner from "../Spinner/Spinner";
import { MembersList } from "../Members/MembersList";
import {
  LinkedinCompanyProfile,
  LinkedinFollowCompany,
  LinkedinLogin,
  LinkedinAddProfile,
  LinkedinProfile,
  LinkedinShare,
 
  TwitterButton,
  TwitterTweet
} from 'react-social-plugins';

/**
 * En esta seccion dispondremos el componente Nosotros, que se encontrara
 * bajo la ruta /Nosotros, el cual podremos ver informacion acerca de la ONG
 * Dicha informacion se renderizará de forma dinamica desde una API
 * @returns jsx para mostrar en pantalla
 */

const Nosotros = () => {
  const [sobreNosotros, setSobreNosotros] = useState({
    text: "",
    imgSrc: "",
    loaded: false,
  });

  const getOrganizationData = () => {
    Get(
      process.env.REACT_APP_URL_BASE_ENDPOINT +
        process.env.REACT_APP_URL_ORGANIZATION_PATH
    ).then((res) => {
      const data = res.data.data;
      setSobreNosotros({
        ...sobreNosotros,
        loaded: true,
        text: data.long_description,
        imgSrc: data.logo,
      });
    });
  };

  useEffect(() => {
    getOrganizationData();
  }, []);

  return (
    <>
      <div className="containerGeneral">
        <Spinner visible={!sobreNosotros.loaded} className="spinner" />
        <div className="containerData">
          <h1 className="centerText h1-heading"  style={{ marginTop: 30 }}>
            Nosotros
          </h1>
          <div className="flexContainer">
            <div className="textoContainer">
              {sobreNosotros.loaded && (
                <div dangerouslySetInnerHTML={{ __html: sobreNosotros.text }} />
              )}
            </div>
            <div
              className="imageContainer"
              style={{ backgroundImage: `url(${sobreNosotros.imgSrc})` }}
            ></div>
          </div>
              <MembersList />
          <div className="container-twitter">
          <h2 className="centerText twitter-tittle" style={{ marginTop: 30 }}>
            Últimos Tweets
          </h2>
            <TwitterTweet
            className= "twitter-item"
                align='left'
                coversation='none'
                tweetId='1527122168684978176' 
                theme='light'
                width={350}
            />
            <TwitterTweet
            className= "twitter-item"
                align='left'
                coversation='none'
                tweetId='1527122059213647872'
                theme='light'
                width={350}
            />
            <TwitterTweet
            className= "twitter-item"
                align='left'
                coversation='none'
                tweetId='1527121093617647617'
                theme='light'
                width={350}
            />
     

          </div>
          <div className="novedades-twitter">
            <h4 className="centerText h4-twitter" style={{ marginTop: 30 }}>
              ¿Tenés algo para contarnos?
            </h4>
            <TwitterButton
              hashtags="ONG, voluntariado"
              target="OngSomosMas1"
              text="Suamate a Somos mas"
              type="Hashtag"
              size="large"
              via="OngSomosMas1"
            />
            <LinkedinFollowCompany
              companyId={12312312}
              counter="top" // Or "right"
              lang="en_US"
            />

          </div>

        </div>
      </div>
    </>
  );
};

export default Nosotros;
