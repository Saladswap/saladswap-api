import Web3 from "web3";
import { AbiItem } from 'web3-utils'

// const BSC_NODE_RPC = [
//   "https://bsc-dataseed.binance.org/",
//   "https://bsc-dataseed1.defibit.io/",
//   "https://bsc-dataseed1.ninicoin.io/",
// ];
const BSC_NODE_RPC = [
  "https://data-seed-prebsc-1-s1.binance.org:8545/",
  "https://data-seed-prebsc-1-s1.binance.org:8545/",
  "https://data-seed-prebsc-1-s1.binance.org:8545/",
];

export const getWeb3 = (): Web3 => {
  const provider: string = BSC_NODE_RPC[Math.floor(Math.random() * BSC_NODE_RPC.length)];

  return new Web3(new Web3.providers.HttpProvider(provider, { timeout: 30000 }));
};

export const getContract = (abi: any, address: string) => {
  const web3: Web3 = getWeb3();

  return new web3.eth.Contract((abi as unknown) as AbiItem, address);
};
