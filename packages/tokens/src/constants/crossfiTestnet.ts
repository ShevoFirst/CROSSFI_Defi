import { WETH9, ERC20Token } from '@pancakeswap/sdk'
import { ChainId } from '@pancakeswap/chains'
import { USDC, CAKE } from './common'

export const crossfiTestnetTokens = {
  weth: WETH9[ChainId.CROSSFI_TESTNET],
  usdc: USDC[ChainId.CROSSFI_TESTNET],
  cake: CAKE[ChainId.CROSSFI_TESTNET],
  mockA: new ERC20Token(ChainId.CROSSFI_TESTNET, '0x74f4b6c7f7f518202231b58ce6e8736df6b50a81', 18, 'A', 'Mock A'),
}
