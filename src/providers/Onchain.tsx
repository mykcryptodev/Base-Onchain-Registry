import { OnchainKitProvider } from '@coinbase/onchainkit';
import { 
  RainbowKitProvider, 
  connectorsForWallets, 
  getDefaultConfig, 
} from '@rainbow-me/rainbowkit'; 
import { 
  metaMaskWallet, 
  rainbowWallet, 
  coinbaseWallet, 
} from '@rainbow-me/rainbowkit/wallets'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains';
 
import '@coinbase/onchainkit/styles.css';
import '@rainbow-me/rainbowkit/styles.css'; 
import { env } from '~/env';
import { type ReactNode } from 'react';
 
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
    appName: 'onchainkit',
    projectId: env.NEXT_PUBLIC_WALLETCONNECT_ID,
  },
);
 
const wagmiConfig = getDefaultConfig({ 
  appName: 'onchainkit',
  projectId: env.NEXT_PUBLIC_WALLETCONNECT_ID,
  chains: [base],
  ssr: true, // If your dApp uses server side rendering (SSR)
}); 

type Props = {
  children: ReactNode;
}

function OnchainProviders({ children }: Props) {
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