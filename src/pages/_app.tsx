import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";
import OnchainProviders from "~/providers/Onchain";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import '@coinbase/onchainkit/styles.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <OnchainProviders>
        <Component {...pageProps} />
      </OnchainProviders>
    </div>
  );
};

export default api.withTRPC(MyApp);
