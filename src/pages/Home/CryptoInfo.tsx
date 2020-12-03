import React from 'react'
import { CryptoInfo } from './types'

export function CryptoInfoComponent({ crypto }: { crypto: CryptoInfo }): JSX.Element {
  const isBadCrypto = crypto.market_data.price_change_percentage_24h <= 0
  return (
    <div id="crypto-presentation">
      <h1 style={{ display: 'flex', alignItems: 'center' }}>
        {crypto.name} <img src={crypto.image.small} alt={`${crypto.name} logo`} />
      </h1>
      <h2>Market Cap Rank: {crypto.market_cap_rank}</h2>
      <h3>Symbol: {crypto.symbol}</h3>
      <p style={{ color: isBadCrypto ? 'red' : 'green' }}>
        Percentual 24h price change: {crypto.market_data.price_change_percentage_24h}
      </p>
      <p>Current price in USD: {crypto.market_data.current_price.usd}</p>
    </div>
  )
}
