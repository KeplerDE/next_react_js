import 'bootstrap/dist/css/bootstrap.min.css';
import "@/styles/main.scss";
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import 'slate-simple-editor/dist/index.css';
import { useState, useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? <Component {...pageProps} /> : <h1>Prerendered</h1>}
    </>
  );
}
