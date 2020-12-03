export interface GraphData {
  prices: [number, number][]
}
export interface CryptoInfo {
  market_data: { price_change_percentage_24h: number; current_price: { usd: number } }
  image: { small: string }
  name: string
  market_cap_rank: number
  symbol: string
  id: string
}
export interface PastSearchesProps {
  searches: string[]
  current: string
  searchAgain: (id: string) => Promise<void>
}
