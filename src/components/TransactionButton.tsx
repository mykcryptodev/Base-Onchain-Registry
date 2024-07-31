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
import type { ContractFunctionParameters } from 'viem';

type Props = {
  contractAddress?: string;
  functionSignature?: string,
  ctaText: string;
  className?: string;
}
const TransactionComponents: FC<Props> = ({
  contractAddress,
  ctaText,
  className,
  functionSignature,
}) => {
  const { address } = useAccount();

  function generateFunctionParameters(signature: string) {
    const [functionNamePart, inputsPart] = signature.split('(');
    const functionName = functionNamePart!.trim().toLowerCase();
    const inputsString = inputsPart?.split(')')[0]?.trim();
    const inputTypes = inputsString?.split(',').map(type => type.trim());
  
    // Generate ABI inputs
    const inputs = inputTypes?.map((type, index) => ({
      name: `arg${index}`, // You can change this to more meaningful names if you have them
      type: type
    }));
  
    // Placeholder for args, you should replace these with actual values
    const args = inputTypes?.map(type => {
      switch (type) {
        case 'address':
          return address;
        case 'uint256':
          return 1; // Replace with actual uint256 value
        case 'bytes':
          return "0x"; // Replace with actual bytes data
        default:
          return null; // Default case for unhandled types
      }
    });
  
    return {
      functionName,
      inputs,
      args,
    }
  }

  if (!contractAddress || !functionSignature) return null;
 
  const contractFunctionParameters = {
    address: contractAddress,
    ...generateFunctionParameters(functionSignature)
  };
  console.log({ contractFunctionParameters })
  const contracts = [
    {
      address: contractAddress,
      abi: [{
        type: "function",
        name: functionSignature.split('(')[0],
        inputs: [],
        outputs: [],
        stateMutability: 'nonpayable',
      }],
      functionName: functionSignature.split('(')[0],
      args: [],
    },
  ] as ContractFunctionParameters[];

  console.log({ contracts });
 
  return address ? (
    <Transaction 
      address={address} 
      chainId={8453}
      contracts={contracts}
    >
      <TransactionButton
        className={className}
      />
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