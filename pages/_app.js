import Home from "@/pages";
import "../styles/globals.css";
import Layout from "../components/Layout";
import AuthProviders from "./Providers";
import {CookiesProvider} from "react-cookie"

export default function App({ Component, pageProps }) {
  return (
    <CookiesProvider>
    <AuthProviders>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </AuthProviders>
    </CookiesProvider>
  );
}
