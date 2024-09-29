import { CHAINS } from 'config/chains' // Ваши исходные цепи
import { PUBLIC_NODES } from 'config/nodes' // Ваши публичные узлы
import { configureChains } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { mainnet } from 'wagmi/chains'
import { crossfi } from './customChains' // Импортируйте вашу пользовательскую цепь

const mostNodesConfig = Object.values(PUBLIC_NODES).reduce((prev, cur) => {
  return cur.length > prev ? cur.length : prev
}, 0)

export const { publicClient, chains } = configureChains(
  [...CHAINS, crossfi], // Используйте обновленный массив с вашей цепью
  Array.from({ length: mostNodesConfig }).map((_, i) => {
    return jsonRpcProvider({
      rpc: (chain) => {
        if (process.env.NODE_ENV === 'test' && chain.id === mainnet.id && i === 0) {
          return { http: 'https://ethereum.publicnode.com' }
        }

        // Добавьте условие для обработки CrossFi Testnet
        if (chain.id === crossfi.id) {
          return {
            http: crossfi.rpcUrls.public.http[0], // Убедитесь, что используете правильный RPC URL
          }
        }

        return PUBLIC_NODES[chain.id]?.[i] ? { http: PUBLIC_NODES[chain.id][i] } : null
      },
    })
  }),
  {
    batch: {
      multicall: {
        batchSize: 1024 * 200,
        wait: 16,
      },
    },
    pollingInterval: 6_000,
  },
)
