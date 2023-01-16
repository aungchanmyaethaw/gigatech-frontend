import "styles/globals.css";
import { Provider } from "urql";
import { client, ssrCache } from "utils/urqlClient";
import Layout from "components/Layout";
import { AppContextProvider } from "contexts/AppContext";
export default function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Provider value={client}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </AppContextProvider>
  );
}
