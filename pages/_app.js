import { useEffect } from "react";
import AOS from "aos";
import { Analytics } from "@vercel/analytics/react";

import "aos/dist/aos.css";
import "../styles/globals.css";

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

  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
