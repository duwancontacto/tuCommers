
// Bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/styles/index.scss";
import 'react-phone-input-2/lib/style.css'
import Head from "next/head";

import ThemeState from "../context/Theme/ThemeState";
import UserState from "../context/User/UserState";

import ProgressBar from "../Components/ProgressBar/ProgressBar";

import { ToastProvider } from 'react-toast-notifications';

import React, { useState, useEffect } from "react"


import PrivateRoutes from "../Components/PrivateRoutes/PrivateRoutes";

function MyApp({ Component, pageProps, props }) {

  const [jwtPassword, setJwtPassword] = useState(null)
  useEffect(() => {
    if (props.key) setJwtPassword(props.key)

  }, [])


  return (
    <ToastProvider>
      <ThemeState>
        <UserState>
          <ProgressBar spinner={false} color={"#20df7f"} />
          <Head>
            <title>TuCommers</title>
          </Head>

          <PrivateRoutes jwtPassword={jwtPassword}>
            <Component className="dashboard-collapse" {...pageProps} />
          </PrivateRoutes>

        </UserState>
      </ThemeState>
    </ToastProvider>
  );
}

export default MyApp;

MyApp.getInitialProps = async () => {
  return {
    props: {
      key: await process.env.PALABRA_SECRETA
    }
  }
}