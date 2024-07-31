import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { 
  RainbowKitProvider, 
  connectorsForWallets, 
} from '@rainbow-me/rainbowkit'; 
import { 
  metaMaskWallet, 
  rainbowWallet, 
  coinbaseWallet, 
} from '@rainbow-me/rainbowkit/wallets'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains';
import { http, createConfig } from 'wagmi';

import '@coinbase/onchainkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css'; 
import { env } from '~/env';
 
const queryClient = new QueryClient();
 
const connectors = connectorsForWallets( 
  [
    {
      groupName: 'Recommended Wallet',
      wallets: [coinbaseWallet],
    },
    {
      groupName: 'Other Wallets',
      wallets: [rainbowWallet, metaMaskWallet],
    },
  ],
  {
    appName: 'Onchain Registry',
    projectId: env.NEXT_PUBLIC_WALLETCONNECT_ID,
  },
);

export const wagmiConfig = createConfig({
  chains: [base],
  multiInjectedProviderDiscovery: false,
  connectors,
  ssr: false,
  transports: {
    [base.id]: http(),
  },
});
 
function OnchainProviders({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
        >
          <RainbowKitProvider modalSize="compact">
            {children}
          </RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 
 
export default OnchainProviders;