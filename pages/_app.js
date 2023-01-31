import "aos/dist/aos.css";
import "../styles/globals.css";

import { useEffect } from "react";
import AOS from "aos";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, []);

  return <Component {...pageProps} />;
}
