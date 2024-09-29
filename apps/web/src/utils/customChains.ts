import { Chain } from 'viem/chains'

export const crossfi: Chain = {
  id: 4157,
  name: 'CrossFi Testnet',
  network: 'crossfi',
  nativeCurrency: {
    decimals: 18,
    name: 'XFI',
    symbol: 'XFI',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.ms'],
    },
    public: {
      http: ['https://rpc.testnet.ms'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://scan.testnet.ms' },
  },
}
