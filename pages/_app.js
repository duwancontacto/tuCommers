import "../styles/globals.scss";
// Bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "../Assets/Global/index.scss";
import Head from "next/head";

import ThemeState from "../context/Theme/ThemeState";

import ProgressBar from "../Components/ProgressBar/ProgressBar";

function MyApp({Component, pageProps}) {
  return (
    <ThemeState>
      <ProgressBar spinner={false} color={"#20df7f"} />
      <Head>
        <title>TuCommers</title>
      </Head>
      <Component {...pageProps} />;
    </ThemeState>
  );
}

export default MyApp;
