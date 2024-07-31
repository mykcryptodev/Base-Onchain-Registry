import { Avatar, Name } from '@coinbase/onchainkit/identity';
import { 
  Transaction, 
  TransactionButton, 
  TransactionSponsor, 
  TransactionStatus, 
  TransactionStatusAction, 
  TransactionStatusLabel, 
} from '@coinbase/onchainkit/transaction'; 
import { Wallet, ConnectWallet } from '@coinbase/onchainkit/wallet';
import { type FC } from 'react';
import { useAccount } from 'wagmi';
 
type Props = {
  contractAddress?: string;
  functionSignature?: string,
  ctaText: string;
}
const TransactionComponents: FC<Props> = ({
  contractAddress,
  ctaText,
  functionSignature,
}) => {
  const { address } = useAccount();

  if (!contractAddress || !functionSignature) return null;
 
  const contracts = [
    {
      address: contractAddress,
      abi: ['function ' + functionSignature] as const,
      functionName: functionSignature.split('(')[0],
      args: [],
    },
  ];

  console.log({ contracts });
 
  return address ? (
    <Transaction 
      address={address} 
      chainId={8453}
      // Ignore type errors for this line
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      contracts={contracts}
    >
      <TransactionButton />
      <TransactionSponsor />
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>  
  ) : (
    <Wallet>
      <ConnectWallet>
        <Avatar className='h-6 w-6' />
        <Name />
      </ConnectWallet>
    </Wallet>
  );
}

export default TransactionComponents;