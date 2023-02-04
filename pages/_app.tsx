import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Spin } from "antd";
import "antd/dist/reset.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
export default function App({ Component, pageProps }: AppProps) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setIsPageLoaded(true);
    }
  }, [isLoaded]);
  return (
    <div>
      <ToastContainer />
      {isPageLoaded ? (
        <Component {...pageProps} />
      ) : (
        <div className="loader__container">
          <Spin />
        </div>
      )}
    </div>
  );
}
