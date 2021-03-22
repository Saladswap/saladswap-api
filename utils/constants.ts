import { ChainId, Token } from "@saladswap/sdk";

// BEP-20 addresses.
export const SALAD = "0x9EffAf5A3684c510263075e2E91d2594CcA671b2";
export const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
export const DEAD = "0x000000000000000000000000000000000000dEaD";

// Contract addresses.
export const SALAD_BNB_FARM = "0xCa1f193043C4da5Fd262C3D365456553147BBACE";
export const MASTERCHEF_CONTRACT = "0x34f3D65814313f4Ddcdc2c52f9ce0c83F6e96084";
export const LOTTERY_CONTRACT = "0xEa11F62709a71b7981DcDe21609DabC66Eaebaf4";
export const MULTICALL_CONTRACT = "0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb";

// SaladSwap SDK Token.
export const SALAD_TOKEN = new Token(ChainId.MAINNET, SALAD, 18);
export const WBNB_TOKEN = new Token(ChainId.MAINNET, WBNB, 18);
export const SALAD_BNB_TOKEN = new Token(ChainId.MAINNET, SALAD_BNB_FARM, 18);
